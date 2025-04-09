
import React from 'react';
import { Coffee } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-coffee-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Coffee size={32} className="mr-2" />
          <h1 className="text-2xl font-bold">Coffee Shop Profit Optimizer</h1>
        </div>
        <div className="text-sm md:text-base">
          <p className="italic">Applying calculus to maximize your coffee business profits</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
