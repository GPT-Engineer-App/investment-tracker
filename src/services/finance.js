import axios from "axios";

const API_URL = "https://www.google.com/finance/quote/";

export const fetchStockValues = async (stocks) => {
  const stockValues = {};
  for (const stock of stocks) {
    try {
      const response = await axios.get(`${API_URL}${stock.stockName}`);
      // Assuming the response structure contains a 'price' field
      stockValues[stock.stockName] = {
        currentValue: response.data.price,
      };
    } catch (error) {
      console.error(`Error fetching data for ${stock.stockName}:`, error);
      stockValues[stock.stockName] = {
        currentValue: 0, // Default to 0 if there's an error
      };
    }
  }
  return stockValues;
};

export const fetchPortfolioValue = async () => {
  const stocks = JSON.parse(localStorage.getItem("stocks")) || [];
  const stockValues = await fetchStockValues(stocks);
  let totalValue = 0;
  let numberOfAssets = 0;

  for (const stock of stocks) {
    const currentValue = stockValues[stock.stockName]?.currentValue || 0;
    totalValue += currentValue * stock.shares;
    numberOfAssets += 1;
  }

  return { totalValue, numberOfAssets };
};