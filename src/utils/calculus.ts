
/**
 * Calculus utility functions for coffee shop profit optimization
 */

// Demand function for coffee based on price
export const coffeeDemand = (price: number, params: { intercept: number, slope: number }) => {
  const demand = params.intercept - params.slope * price;
  return demand > 0 ? demand : 0;
};

// Demand function for pastries based on quantity
export const pastryDemand = (quantity: number, params: { intercept: number, slope: number }) => {
  const price = params.intercept - params.slope * quantity;
  return price > 0 ? price : 0;
};

// Revenue function
export const revenueFunction = (
  coffeePrice: number, 
  pastryQuantity: number, 
  coffeeDemandParams: { intercept: number, slope: number },
  pastryDemandParams: { intercept: number, slope: number }
) => {
  const coffeeQuantity = coffeeDemand(coffeePrice, coffeeDemandParams);
  const pastryPrice = pastryDemand(pastryQuantity, pastryDemandParams);
  
  return (coffeePrice * coffeeQuantity) + (pastryPrice * pastryQuantity);
};

// Cost function
export const costFunction = (
  coffeePrice: number, 
  pastryQuantity: number, 
  costParams: { fixed: number, coffeeCoeff: number, pastryCoeff: number }
) => {
  return costParams.fixed + (costParams.coffeeCoeff * Math.pow(coffeePrice, 2)) + 
    (costParams.pastryCoeff * Math.pow(pastryQuantity, 2));
};

// Profit function
export const profitFunction = (
  coffeePrice: number, 
  pastryQuantity: number, 
  coffeeDemandParams: { intercept: number, slope: number },
  pastryDemandParams: { intercept: number, slope: number },
  costParams: { fixed: number, coffeeCoeff: number, pastryCoeff: number }
) => {
  const revenue = revenueFunction(coffeePrice, pastryQuantity, coffeeDemandParams, pastryDemandParams);
  const cost = costFunction(coffeePrice, pastryQuantity, costParams);
  return revenue - cost;
};

// Partial derivative of profit with respect to coffee price
export const profitDerivativeCoffeePrice = (
  coffeePrice: number,
  coffeeDemandParams: { intercept: number, slope: number },
  costParams: { coffeeCoeff: number }
) => {
  // Given P(p) = p * (a - b*p) - (fixed + c*p^2)
  // dP/dp = (a - b*p) - b*p - 2*c*p = a - 2*b*p - 2*c*p
  return coffeeDemandParams.intercept - 
    2 * coffeeDemandParams.slope * coffeePrice - 
    2 * costParams.coffeeCoeff * coffeePrice;
};

// Partial derivative of profit with respect to pastry quantity
export const profitDerivativePastryQuantity = (
  pastryQuantity: number,
  pastryDemandParams: { intercept: number, slope: number },
  costParams: { pastryCoeff: number }
) => {
  // Given P(q) = q * (c - d*q) - (fixed + e*q^2)
  // dP/dq = (c - d*q) - d*q - 2*e*q = c - 2*d*q - 2*e*q
  return pastryDemandParams.intercept - 
    2 * pastryDemandParams.slope * pastryQuantity - 
    2 * costParams.pastryCoeff * pastryQuantity;
};

// Calculate optimal coffee price using calculus
export const calculateOptimalCoffeePrice = (
  coffeeDemandParams: { intercept: number, slope: number },
  costParams: { coffeeCoeff: number }
) => {
  // Setting the derivative to zero and solving for p:
  // a - 2*b*p - 2*c*p = 0
  // a = 2*p*(b + c)
  // p = a / (2*(b + c))
  return coffeeDemandParams.intercept / 
    (2 * (coffeeDemandParams.slope + costParams.coffeeCoeff));
};

// Calculate optimal pastry quantity using calculus
export const calculateOptimalPastryQuantity = (
  pastryDemandParams: { intercept: number, slope: number },
  costParams: { pastryCoeff: number }
) => {
  // Setting the derivative to zero and solving for q:
  // c - 2*d*q - 2*e*q = 0
  // c = 2*q*(d + e)
  // q = c / (2*(d + e))
  return pastryDemandParams.intercept / 
    (2 * (pastryDemandParams.slope + costParams.pastryCoeff));
};

// Generate data points for plotting
export const generateDataPoints = (
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  step: number,
  func: (x: number, y: number) => number
) => {
  const data = [];
  for (let x = xMin; x <= xMax; x += step) {
    for (let y = yMin; y <= yMax; y += step) {
      data.push({
        x,
        y,
        z: func(x, y)
      });
    }
  }
  return data;
};

// Second derivative test
export const secondDerivativeTest = (
  coffeeDemandParams: { intercept: number, slope: number },
  pastryDemandParams: { intercept: number, slope: number },
  costParams: { coffeeCoeff: number, pastryCoeff: number }
) => {
  // Second derivatives
  const d2p_dp2 = -2 * (coffeeDemandParams.slope + costParams.coffeeCoeff);
  const d2p_dq2 = -2 * (pastryDemandParams.slope + costParams.pastryCoeff);
  const d2p_dpdq = 0; // In our model, these are independent
  
  // Determinant of the Hessian
  const det = d2p_dp2 * d2p_dq2 - d2p_dpdq * d2p_dpdq;
  
  // Check if it's a maximum (both second derivatives negative and determinant positive)
  const isMaximum = d2p_dp2 < 0 && det > 0;
  
  return {
    d2p_dp2,
    d2p_dq2,
    det,
    isMaximum
  };
};
