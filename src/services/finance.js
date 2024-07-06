import axios from "axios";

const API_URL = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=";

export const fetchStockValues = async (stocks) => {
  const stockValues = {};
  const stockSymbols = stocks.map(stock => stock.stockName).join(",");
  try {
    const response = await axios.get(`${API_URL}${stockSymbols}`);
    const quotes = response.data.quoteResponse.result;
    quotes.forEach(quote => {
      stockValues[quote.symbol] = {
        currentValue: quote.regularMarketPrice,
      };
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    stocks.forEach(stock => {
      stockValues[stock.stockName] = {
        currentValue: 0, // Default to 0 if there's an error
      };
    });
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