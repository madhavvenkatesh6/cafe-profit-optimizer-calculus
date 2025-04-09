
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateOptimalCoffeePrice, calculateOptimalPastryQuantity, coffeeDemand, pastryDemand, profitFunction } from '@/utils/calculus';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, TrendingUp } from 'lucide-react';

interface OptimizationResultsProps {
  coffeeDemandParams: {
    intercept: number;
    slope: number;
  };
  pastryDemandParams: {
    intercept: number;
    slope: number;
  };
  costParams: {
    fixed: number;
    coffeeCoeff: number;
    pastryCoeff: number;
  };
}

const OptimizationResults: React.FC<OptimizationResultsProps> = ({
  coffeeDemandParams,
  pastryDemandParams,
  costParams,
}) => {
  const optimalCoffeePrice = calculateOptimalCoffeePrice(coffeeDemandParams, costParams);
  const optimalPastryQuantity = calculateOptimalPastryQuantity(pastryDemandParams, costParams);
  
  const optimalCoffeeDemand = coffeeDemand(optimalCoffeePrice, coffeeDemandParams);
  const optimalPastryPrice = pastryDemand(optimalPastryQuantity, pastryDemandParams);
  
  const maxProfit = profitFunction(
    optimalCoffeePrice,
    optimalPastryQuantity,
    coffeeDemandParams,
    pastryDemandParams,
    costParams
  );
  
  const dailyRevenue = (optimalCoffeePrice * optimalCoffeeDemand) + (optimalPastryPrice * optimalPastryQuantity);
  const dailyCost = costParams.fixed + (costParams.coffeeCoeff * Math.pow(optimalCoffeePrice, 2)) + 
    (costParams.pastryCoeff * Math.pow(optimalPastryQuantity, 2));
  
  // Generate data for price-profit relationship
  const pricePoints = Array.from({ length: 21 }, (_, i) => {
    const price = i;
    const profit = profitFunction(
      price,
      optimalPastryQuantity,
      coffeeDemandParams,
      pastryDemandParams,
      costParams
    );
    return { price, profit };
  });
  
  // Generate data for quantity-profit relationship
  const quantityPoints = Array.from({ length: 21 }, (_, i) => {
    const quantity = i * 5;
    const profit = profitFunction(
      optimalCoffeePrice,
      quantity,
      coffeeDemandParams,
      pastryDemandParams,
      costParams
    );
    return { quantity, profit };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-white shadow-md">
        <CardHeader className="bg-coffee-300">
          <CardTitle className="text-coffee-800 flex items-center justify-between">
            <span>Optimal Solutions</span>
            <Badge variant="outline" className="bg-green-100 text-green-800 px-3">
              <TrendingUp className="w-4 h-4 mr-1" /> Maximum Profit
            </Badge>
          </CardTitle>
          <CardDescription>Derived using calculus optimization techniques</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Parameter</TableHead>
                <TableHead className="w-1/3">Optimal Value</TableHead>
                <TableHead className="w-1/3">Calculation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Coffee Price</TableCell>
                <TableCell className="text-green-700">${optimalCoffeePrice.toFixed(2)}</TableCell>
                <TableCell className="text-sm">
                  a / (2(b + c)) = {coffeeDemandParams.intercept} / (2({coffeeDemandParams.slope} + {costParams.coffeeCoeff}))
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pastry Quantity</TableCell>
                <TableCell className="text-green-700">{optimalPastryQuantity.toFixed(0)} units</TableCell>
                <TableCell className="text-sm">
                  c / (2(d + e)) = {pastryDemandParams.intercept} / (2({pastryDemandParams.slope} + {costParams.pastryCoeff}))
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Coffee Demand</TableCell>
                <TableCell>{optimalCoffeeDemand.toFixed(0)} cups/day</TableCell>
                <TableCell className="text-sm">
                  a - b·p = {coffeeDemandParams.intercept} - {coffeeDemandParams.slope}·{optimalCoffeePrice.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pastry Price</TableCell>
                <TableCell>${optimalPastryPrice.toFixed(2)}</TableCell>
                <TableCell className="text-sm">
                  c - d·q = {pastryDemandParams.intercept} - {pastryDemandParams.slope}·{optimalPastryQuantity.toFixed(0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader className="bg-coffee-300">
          <CardTitle className="text-coffee-800">Financial Results</CardTitle>
          <CardDescription>Projected daily performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-coffee-700">Daily Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-coffee-100 p-4 rounded-lg text-center">
                  <p className="text-sm text-coffee-600 mb-1">Revenue</p>
                  <p className="text-2xl font-bold text-coffee-800">${dailyRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-coffee-100 p-4 rounded-lg text-center">
                  <p className="text-sm text-coffee-600 mb-1">Cost</p>
                  <p className="text-2xl font-bold text-coffee-800">${dailyCost.toFixed(2)}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <p className="text-sm text-green-600 mb-1">Profit</p>
                  <p className="text-2xl font-bold text-green-800">${maxProfit.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-coffee-700">Profit Breakdown</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Coffee</TableCell>
                    <TableCell>${(optimalCoffeePrice * optimalCoffeeDemand).toFixed(2)}</TableCell>
                    <TableCell>${(costParams.coffeeCoeff * Math.pow(optimalCoffeePrice, 2)).toFixed(2)}</TableCell>
                    <TableCell>${(
                      (optimalCoffeePrice * optimalCoffeeDemand) - 
                      (costParams.coffeeCoeff * Math.pow(optimalCoffeePrice, 2))
                    ).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pastries</TableCell>
                    <TableCell>${(optimalPastryPrice * optimalPastryQuantity).toFixed(2)}</TableCell>
                    <TableCell>${(costParams.pastryCoeff * Math.pow(optimalPastryQuantity, 2)).toFixed(2)}</TableCell>
                    <TableCell>${(
                      (optimalPastryPrice * optimalPastryQuantity) - 
                      (costParams.pastryCoeff * Math.pow(optimalPastryQuantity, 2))
                    ).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fixed Overhead</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>${costParams.fixed.toFixed(2)}</TableCell>
                    <TableCell className="text-red-500">-${costParams.fixed.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md lg:col-span-2">
        <CardHeader className="bg-coffee-200">
          <CardTitle className="text-coffee-700">Profit Visualization</CardTitle>
          <CardDescription>
            These graphs show how profit changes with coffee price and pastry quantity
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80">
              <h3 className="text-md font-medium mb-2 text-coffee-700">Coffee Price vs. Profit</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart
                  data={pricePoints}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="price" 
                    label={{ value: 'Coffee Price ($)', position: 'insideBottomRight', offset: -10 }}
                  />
                  <YAxis 
                    label={{ value: 'Profit ($)', angle: -90, position: 'insideLeft', offset: -5 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => ['$' + value.toFixed(2), 'Profit']}
                    labelFormatter={(value) => 'Price: $' + value}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#795548" 
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 6, fill: '#4caf50' }}
                  />
                  {pricePoints.map((point, index) => {
                    if (Math.abs(point.price - optimalCoffeePrice) < 0.3) {
                      return (
                        <Line
                          key={index}
                          data={[point]}
                          type="monotone"
                          dataKey="profit"
                          stroke="none"
                          dot={{ r: 6, fill: '#4caf50' }}
                        />
                      );
                    }
                    return null;
                  })}
                </LineChart>
              </ResponsiveContainer>
              <div className="text-center text-sm text-muted-foreground">
                Optimum at ${optimalCoffeePrice.toFixed(2)} per cup
              </div>
            </div>
            <div className="h-80">
              <h3 className="text-md font-medium mb-2 text-coffee-700">Pastry Quantity vs. Profit</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart
                  data={quantityPoints}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="quantity" 
                    label={{ value: 'Pastry Quantity', position: 'insideBottomRight', offset: -10 }}
                  />
                  <YAxis 
                    label={{ value: 'Profit ($)', angle: -90, position: 'insideLeft', offset: -5 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => ['$' + value.toFixed(2), 'Profit']}
                    labelFormatter={(value) => 'Quantity: ' + value}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#795548"
                    strokeWidth={2} 
                    dot={{ r: 2 }}
                    activeDot={{ r: 6, fill: '#4caf50' }}
                  />
                  {quantityPoints.map((point, index) => {
                    if (Math.abs(point.quantity - optimalPastryQuantity) < 3) {
                      return (
                        <Line
                          key={index}
                          data={[point]}
                          type="monotone"
                          dataKey="profit"
                          stroke="none"
                          dot={{ r: 6, fill: '#4caf50' }}
                        />
                      );
                    }
                    return null;
                  })}
                </LineChart>
              </ResponsiveContainer>
              <div className="text-center text-sm text-muted-foreground">
                Optimum at {optimalPastryQuantity.toFixed(0)} pastries per day
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptimizationResults;
