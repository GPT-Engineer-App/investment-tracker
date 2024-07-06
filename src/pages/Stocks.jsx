import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState("");
  const [shares, setShares] = useState("");

  const addStock = () => {
    if (stockName && shares) {
      setStocks([...stocks, { stockName, shares }]);
      setStockName("");
      setShares("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Stocks</h1>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Stock Name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />
        <Input
          placeholder="Number of Shares"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
        />
        <Button onClick={addStock}>Add Stock</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stock Name</TableHead>
            <TableHead>Number of Shares</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock, index) => (
            <TableRow key={index}>
              <TableCell>{stock.stockName}</TableCell>
              <TableCell>{stock.shares}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Stocks;