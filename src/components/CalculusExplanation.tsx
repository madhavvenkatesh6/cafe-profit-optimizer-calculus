
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface CalculusExplanationProps {
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

const CalculusExplanation: React.FC<CalculusExplanationProps> = ({
  coffeeDemandParams,
  pastryDemandParams,
  costParams,
}) => {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="bg-coffee-400 text-white">
        <CardTitle>Understanding the Calculus</CardTitle>
        <CardDescription className="text-coffee-100">
          How calculus helps maximize profit
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-coffee-700 font-medium">The Mathematical Model</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold mb-1">Demand Functions:</h4>
                  <p>We model how demand changes with price:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Coffee demand: D<sub>c</sub>(p) = {coffeeDemandParams.intercept} - {coffeeDemandParams.slope}p</li>
                    <li>Pastry demand/price: D<sub>p</sub>(q) = {pastryDemandParams.intercept} - {pastryDemandParams.slope}q</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Revenue Function:</h4>
                  <p>Revenue = (Coffee Price × Coffee Demand) + (Pastry Price × Pastry Quantity)</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    R(p,q) = p × ({coffeeDemandParams.intercept} - {coffeeDemandParams.slope}p) + 
                    q × ({pastryDemandParams.intercept} - {pastryDemandParams.slope}q)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Cost Function:</h4>
                  <p>Cost = Fixed Cost + Variable Costs (modeled as quadratic functions)</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    C(p,q) = {costParams.fixed} + {costParams.coffeeCoeff}p² + {costParams.pastryCoeff}q²
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Profit Function:</h4>
                  <p>Profit = Revenue - Cost</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">P(p,q) = R(p,q) - C(p,q)</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-coffee-700 font-medium">Finding Critical Points</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <p>
                  To find the maximum profit, we use calculus to identify critical points where the 
                  partial derivatives equal zero:
                </p>
                
                <div>
                  <h4 className="font-bold mb-1">For Coffee Price (p):</h4>
                  <p>1. Calculate the partial derivative:</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    ∂P/∂p = ({coffeeDemandParams.intercept} - {coffeeDemandParams.slope}p) - {coffeeDemandParams.slope}p - 2({costParams.coffeeCoeff})p
                  </p>
                  <p>2. Set it equal to zero:</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    {coffeeDemandParams.intercept} - {2 * coffeeDemandParams.slope}p - {2 * costParams.coffeeCoeff}p = 0
                  </p>
                  <p>3. Solve for the optimal price:</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    {coffeeDemandParams.intercept} = {2 * coffeeDemandParams.slope}p + {2 * costParams.coffeeCoeff}p
                  </p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    {coffeeDemandParams.intercept} = ({2 * coffeeDemandParams.slope + 2 * costParams.coffeeCoeff})p
                  </p>
                  <p className="font-mono bg-gray-100 p-2 rounded text-green-700 font-bold">
                    p = {coffeeDemandParams.intercept} / {2 * (coffeeDemandParams.slope + costParams.coffeeCoeff)}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-1">For Pastry Quantity (q):</h4>
                  <p>1. Calculate the partial derivative:</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    ∂P/∂q = ({pastryDemandParams.intercept} - {pastryDemandParams.slope}q) - {pastryDemandParams.slope}q - 2({costParams.pastryCoeff})q
                  </p>
                  <p>2. Set it equal to zero:</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    {pastryDemandParams.intercept} - {2 * pastryDemandParams.slope}q - {2 * costParams.pastryCoeff}q = 0
                  </p>
                  <p>3. Solve for the optimal quantity:</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    {pastryDemandParams.intercept} = {2 * pastryDemandParams.slope}q + {2 * costParams.pastryCoeff}q
                  </p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    {pastryDemandParams.intercept} = ({2 * pastryDemandParams.slope + 2 * costParams.pastryCoeff})q
                  </p>
                  <p className="font-mono bg-gray-100 p-2 rounded text-green-700 font-bold">
                    q = {pastryDemandParams.intercept} / {2 * (pastryDemandParams.slope + costParams.pastryCoeff)}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-coffee-700 font-medium">Second Derivative Test</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <p>
                  To confirm we've found a maximum (not a minimum or saddle point), we check the second derivatives:
                </p>
                
                <div>
                  <h4 className="font-bold mb-1">Second Partial Derivatives:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <p className="font-mono bg-gray-100 p-1 rounded inline-block">
                        ∂²P/∂p² = -2({coffeeDemandParams.slope}) - 2({costParams.coffeeCoeff}) = -{2 * (coffeeDemandParams.slope + costParams.coffeeCoeff)}
                      </p>
                    </li>
                    <li>
                      <p className="font-mono bg-gray-100 p-1 rounded inline-block">
                        ∂²P/∂q² = -2({pastryDemandParams.slope}) - 2({costParams.pastryCoeff}) = -{2 * (pastryDemandParams.slope + costParams.pastryCoeff)}
                      </p>
                    </li>
                    <li>
                      <p className="font-mono bg-gray-100 p-1 rounded inline-block">
                        ∂²P/∂p∂q = 0
                      </p>
                      <span> (Because coffee price and pastry quantity are independent in our model)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-1">Hessian Matrix:</h4>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    H = [<br />
                    &nbsp;&nbsp;∂²P/∂p² &nbsp;&nbsp;&nbsp; ∂²P/∂p∂q<br />
                    &nbsp;&nbsp;∂²P/∂q∂p &nbsp;&nbsp; ∂²P/∂q²<br />
                    ]
                  </p>
                  <p className="font-mono bg-gray-100 p-2 rounded">
                    H = [<br />
                    &nbsp;&nbsp;-{2 * (coffeeDemandParams.slope + costParams.coffeeCoeff)} &nbsp;&nbsp;&nbsp; 0<br />
                    &nbsp;&nbsp;0 &nbsp;&nbsp; -{2 * (pastryDemandParams.slope + costParams.pastryCoeff)}<br />
                    ]
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-1">Confirmation:</h4>
                  <p>
                    Since both second partial derivatives are negative and the determinant of the Hessian is positive
                    ({2 * (coffeeDemandParams.slope + costParams.coffeeCoeff)} × {2 * (pastryDemandParams.slope + costParams.pastryCoeff)} > 0),
                    we have confirmed that our critical point is a maximum.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-coffee-700 font-medium">Practical Applications</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <p>
                  This model demonstrates how calculus can be applied to real business decisions:
                </p>
                
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <span className="font-bold">Price Elasticity of Demand:</span> The model accounts for how 
                    customer purchasing behavior changes with price. The slope parameters 
                    ({coffeeDemandParams.slope} for coffee) represent how sensitive customers are to price changes.
                  </li>
                  
                  <li>
                    <span className="font-bold">Economies of Scale:</span> The quadratic cost functions model 
                    how costs don't increase linearly with production/pricing. This represents the real-world 
                    complexity of business operations.
                  </li>
                  
                  <li>
                    <span className="font-bold">Optimization:</span> Finding the maximum profit point using 
                    calculus is more precise than trial-and-error approaches, saving time and increasing profitability.
                  </li>
                  
                  <li>
                    <span className="font-bold">Decision Making:</span> By understanding how changing parameters 
                    (like fixed costs or customer price sensitivity) affects optimal decisions, owners can 
                    adapt to changing market conditions.
                  </li>
                </ul>
                
                <p className="italic border-l-4 border-coffee-300 pl-3">
                  "In business, calculus helps us navigate the nonlinear relationships between price, 
                  demand, cost, and profit to make optimal decisions that maximize returns."
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CalculusExplanation;
