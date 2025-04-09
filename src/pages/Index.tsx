
import React, { useState } from 'react';
import Header from '@/components/Header';
import ParameterInput from '@/components/ParameterInput';
import OptimizationResults from '@/components/OptimizationResults';
import CalculusExplanation from '@/components/CalculusExplanation';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee } from 'lucide-react';

const Index = () => {
  const [coffeeDemandParams, setCoffeeDemandParams] = useState({
    intercept: 100,
    slope: 5,
  });
  
  const [pastryDemandParams, setPastryDemandParams] = useState({
    intercept: 200,
    slope: 2,
  });
  
  const [costParams, setCostParams] = useState({
    fixed: 50,
    coffeeCoeff: 2,
    pastryCoeff: 3,
  });

  return (
    <div className="min-h-screen bg-coffee-100">
      <Header />
      
      <main className="container mx-auto py-8 px-4 md:px-6 space-y-8">
        <Card className="border-none shadow-lg overflow-hidden">
          <CardContent className="p-6 md:p-8 bg-gradient-to-br from-coffee-200 to-coffee-300">
            <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
              <div className="bg-coffee-600 text-white p-4 rounded-full">
                <Coffee size={32} />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-coffee-800">Coffee Shop Profit Optimizer</h1>
                <p className="text-coffee-600">Using calculus to maximize your profit</p>
              </div>
            </div>
            <p className="text-coffee-700">
              This application uses calculus to determine the optimal pricing for coffee and quantity of pastries 
              that will maximize profit for your coffee shop. Adjust the parameters below to see how different 
              factors affect your optimal business decisions.
            </p>
          </CardContent>
        </Card>

        <section id="parameters" className="pt-4">
          <h2 className="text-2xl font-bold text-coffee-700 mb-6">Business Parameters</h2>
          <ParameterInput 
            coffeeDemandParams={coffeeDemandParams}
            pastryDemandParams={pastryDemandParams}
            costParams={costParams}
            onCoffeeDemandChange={setCoffeeDemandParams}
            onPastryDemandChange={setPastryDemandParams}
            onCostParamsChange={setCostParams}
          />
        </section>

        <section id="results" className="pt-4">
          <h2 className="text-2xl font-bold text-coffee-700 mb-6">Optimization Results</h2>
          <OptimizationResults 
            coffeeDemandParams={coffeeDemandParams}
            pastryDemandParams={pastryDemandParams}
            costParams={costParams}
          />
        </section>

        <section id="explanation" className="pt-4">
          <h2 className="text-2xl font-bold text-coffee-700 mb-6">Mathematical Explanation</h2>
          <CalculusExplanation 
            coffeeDemandParams={coffeeDemandParams}
            pastryDemandParams={pastryDemandParams}
            costParams={costParams}
          />
        </section>

        <footer className="text-center text-coffee-600 py-8 border-t border-coffee-200">
          <p>© 2025 Coffee Shop Profit Optimizer</p>
          <p className="text-sm mt-2">A practical application of calculus in business optimization</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
