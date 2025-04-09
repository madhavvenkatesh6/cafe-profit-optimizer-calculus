
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ParameterInputProps {
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
  onCoffeeDemandChange: (params: { intercept: number; slope: number }) => void;
  onPastryDemandChange: (params: { intercept: number; slope: number }) => void;
  onCostParamsChange: (params: { fixed: number; coffeeCoeff: number; pastryCoeff: number }) => void;
}

const ParameterInput: React.FC<ParameterInputProps> = ({
  coffeeDemandParams,
  pastryDemandParams,
  costParams,
  onCoffeeDemandChange,
  onPastryDemandChange,
  onCostParamsChange,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    param: string,
    type: 'coffee' | 'pastry' | 'cost'
  ) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;

    switch (type) {
      case 'coffee':
        onCoffeeDemandChange({
          ...coffeeDemandParams,
          [param]: value,
        });
        break;
      case 'pastry':
        onPastryDemandChange({
          ...pastryDemandParams,
          [param]: value,
        });
        break;
      case 'cost':
        onCostParamsChange({
          ...costParams,
          [param]: value,
        });
        break;
    }
  };

  const handleSliderChange = (values: number[], param: string, type: 'coffee' | 'pastry' | 'cost') => {
    const value = values[0];
    
    switch (type) {
      case 'coffee':
        onCoffeeDemandChange({
          ...coffeeDemandParams,
          [param]: value,
        });
        break;
      case 'pastry':
        onPastryDemandChange({
          ...pastryDemandParams,
          [param]: value,
        });
        break;
      case 'cost':
        onCostParamsChange({
          ...costParams,
          [param]: value,
        });
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white shadow-md">
        <CardHeader className="bg-coffee-200">
          <CardTitle className="text-coffee-700">Coffee Demand Parameters</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="coffee-intercept">Intercept (a)</Label>
                <span className="text-sm text-muted-foreground">
                  D<sub>c</sub>(p) = {coffeeDemandParams.intercept} - {coffeeDemandParams.slope}p
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="coffee-intercept"
                  min={50}
                  max={200}
                  step={1}
                  value={[coffeeDemandParams.intercept]}
                  onValueChange={(values) => handleSliderChange(values, 'intercept', 'coffee')}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={coffeeDemandParams.intercept}
                  onChange={(e) => handleInputChange(e, 'intercept', 'coffee')}
                  className="w-20"
                />
              </div>
              <p className="text-sm text-muted-foreground">Maximum customers at zero price</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coffee-slope">Slope (b)</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="coffee-slope"
                  min={1}
                  max={20}
                  step={0.5}
                  value={[coffeeDemandParams.slope]}
                  onValueChange={(values) => handleSliderChange(values, 'slope', 'coffee')}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={coffeeDemandParams.slope}
                  onChange={(e) => handleInputChange(e, 'slope', 'coffee')}
                  className="w-20"
                  step="0.5"
                />
              </div>
              <p className="text-sm text-muted-foreground">Rate of demand decrease per price unit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader className="bg-coffee-200">
          <CardTitle className="text-coffee-700">Pastry Demand Parameters</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="pastry-intercept">Intercept (c)</Label>
                <span className="text-sm text-muted-foreground">
                  D<sub>p</sub>(q) = {pastryDemandParams.intercept} - {pastryDemandParams.slope}q
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="pastry-intercept"
                  min={50}
                  max={300}
                  step={1}
                  value={[pastryDemandParams.intercept]}
                  onValueChange={(values) => handleSliderChange(values, 'intercept', 'pastry')}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={pastryDemandParams.intercept}
                  onChange={(e) => handleInputChange(e, 'intercept', 'pastry')}
                  className="w-20"
                />
              </div>
              <p className="text-sm text-muted-foreground">Maximum price when no pastries sold</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pastry-slope">Slope (d)</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="pastry-slope"
                  min={0.5}
                  max={5}
                  step={0.1}
                  value={[pastryDemandParams.slope]}
                  onValueChange={(values) => handleSliderChange(values, 'slope', 'pastry')}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={pastryDemandParams.slope}
                  onChange={(e) => handleInputChange(e, 'slope', 'pastry')}
                  className="w-20"
                  step="0.1"
                />
              </div>
              <p className="text-sm text-muted-foreground">Price decrease per pastry unit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader className="bg-coffee-200">
          <CardTitle className="text-coffee-700">Cost Parameters</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="fixed-cost">Fixed Cost</Label>
                <span className="text-sm text-muted-foreground">
                  C(p,q) = {costParams.fixed} + {costParams.coffeeCoeff}p² + {costParams.pastryCoeff}q²
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="fixed-cost"
                  min={0}
                  max={200}
                  step={5}
                  value={[costParams.fixed]}
                  onValueChange={(values) => handleSliderChange(values, 'fixed', 'cost')}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={costParams.fixed}
                  onChange={(e) => handleInputChange(e, 'fixed', 'cost')}
                  className="w-20"
                  step="5"
                />
              </div>
              <p className="text-sm text-muted-foreground">Daily overhead costs</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coffee-coeff">Coffee Coefficient</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="coffee-coeff"
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={[costParams.coffeeCoeff]}
                  onValueChange={(values) => handleSliderChange(values, 'coffeeCoeff', 'cost')}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={costParams.coffeeCoeff}
                  onChange={(e) => handleInputChange(e, 'coffeeCoeff', 'cost')}
                  className="w-20"
                  step="0.5"
                />
              </div>
              <p className="text-sm text-muted-foreground">Quadratic cost increase with price</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pastry-coeff">Pastry Coefficient</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="pastry-coeff"
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={[costParams.pastryCoeff]}
                  onValueChange={(values) => handleSliderChange(values, 'pastryCoeff', 'cost')}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={costParams.pastryCoeff}
                  onChange={(e) => handleInputChange(e, 'pastryCoeff', 'cost')}
                  className="w-20"
                  step="0.5"
                />
              </div>
              <p className="text-sm text-muted-foreground">Quadratic cost increase with quantity</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParameterInput;
