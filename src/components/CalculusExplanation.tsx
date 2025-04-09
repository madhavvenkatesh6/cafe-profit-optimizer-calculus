import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CalculusExplanationProps {
  coffeeDemandParams: { intercept: number; slope: number };
  pastryDemandParams: { intercept: number; slope: number };
  costParams: { fixed: number; coffeeCoeff: number; pastryCoeff: number };
}

const CalculusExplanation: React.FC<CalculusExplanationProps> = ({
  coffeeDemandParams,
  pastryDemandParams,
  costParams,
}) => {
  const { intercept: coffeeIntercept, slope: coffeeSlope } = coffeeDemandParams;
  const { intercept: pastryIntercept, slope: pastrySlope } = pastryDemandParams;
  const { fixed: fixedCost, coffeeCoeff: coffeeCost, pastryCoeff: pastryCost } = costParams;

  // Define symbolic variables (for display purposes)
  const coffeePriceSymbol = 'P_c';
  const pastryQuantitySymbol = 'Q_p';

  // Profit function
  const profitFunction = `Profit = (${coffeePriceSymbol} * (${coffeeIntercept} - ${coffeeSlope} * ${coffeePriceSymbol})) + (${pastryQuantitySymbol} * (${pastryIntercept} - ${pastrySlope} * ${pastryQuantitySymbol})) - (${fixedCost} + ${coffeeCost} * (${coffeeIntercept} - ${coffeeSlope} * ${coffeePriceSymbol}) + ${pastryCost} * ${pastryQuantitySymbol})`;

  // First-order conditions (derivatives set to zero) - simplified for display
  const focCoffee = `d(Profit)/d(${coffeePriceSymbol}) = ${coffeeIntercept} - 2 * ${coffeeSlope} * ${coffeePriceSymbol} - ${coffeeCost} * (-${coffeeSlope}) = 0`;
  const focPastry = `d(Profit)/d(${pastryQuantitySymbol}) = ${pastryIntercept} - 2 * ${pastrySlope} * ${pastryQuantitySymbol} - ${pastryCost} = 0`;

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-coffee-700">Explanation of the Calculus Behind the Optimization</h3>
        
        <section className="mb-4">
          <h4 className="text-lg font-medium text-coffee-600 mb-2">Profit Function</h4>
          <p className="text-coffee-500">
            The profit function combines revenue from coffee and pastries, minus the costs.  It's defined as:
          </p>
          <div className="bg-coffee-50 rounded p-3 font-mono overflow-auto">
            {profitFunction}
          </div>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-medium text-coffee-600 mb-2">First-Order Conditions</h4>
          <p className="text-coffee-500">
            To maximize profit, we take the derivative of the profit function with respect to the coffee price and the quantity of pastries, and set these equal to zero.  This gives us the following first-order conditions:
          </p>
          <div className="space-y-3">
            <div className="bg-coffee-50 rounded p-3 font-mono overflow-auto">
              {focCoffee}
            </div>
            <div className="bg-coffee-50 rounded p-3 font-mono overflow-auto">
              {focPastry}
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-medium text-coffee-600 mb-2">Solving for Optimal Values</h4>
          <p className="text-coffee-500">
            By solving the first-order conditions simultaneously, we find the optimal coffee price and pastry quantity that maximize profit.  The Optimization Results section displays these calculated values based on the parameters you've entered.
          </p>
        </section>
      </CardContent>
    </Card>
  );
};

export default CalculusExplanation;
