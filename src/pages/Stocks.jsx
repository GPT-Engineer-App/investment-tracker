import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchStockValues } from "@/services/finance";
import { useRecoilState } from 'recoil';
import { stockState } from '@/recoil/atoms';

const Stocks = () => {
  const [stocks, setStocks] = useRecoilState(stockState);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [stockName, setStockName] = useState("");
  const [shares, setShares] = useState("");

  const { data: stockValues, refetch } = useQuery({
    queryKey: ["stockValues"],
    queryFn: () => fetchStockValues(stocks),
    enabled: false,
  });

  const addStock = handleSubmit((data) => {
    if (stockName && data.shares) {
      setStocks([...stocks, { stockName, shares: data.shares }]);
      setStockName("");
      setShares("");
    }
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Stocks</h1>
      <form onSubmit={addStock}>
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Stock Name"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />
          <Controller
            name="shares"
            control={control}
            rules={{ required: true, pattern: /^[0-9]+$/ }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Number of Shares"
                value={shares}
                onChange={(e) => {
                  setShares(e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          <Button type="submit">Add Stock</Button>
        </div>
        {errors.shares && <p className="text-red-500">Please enter a valid number of shares.</p>}
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stock Name</TableHead>
            <TableHead>Number of Shares</TableHead>
            <TableHead>Current Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock, index) => (
            <TableRow key={index}>
              <TableCell>{stock.stockName}</TableCell>
              <TableCell>{stock.shares}</TableCell>
              <TableCell>
                {stockValues?.[stock.stockName]?.currentValue || "Loading..."}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Stocks;