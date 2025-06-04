import type { SurveyData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Pizza } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

// Food Preferences Component
export const FoodPreferencesSection: React.FC<{
  formData: SurveyData;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}> = ({ formData, errors, onChange }) => {
  const foodOptions = ['Pizza', 'Pasta', 'Pap and Wors', 'Other'];

  const handleFoodChange = (foodItem: string, checked: boolean) => {
    const updatedFoods = checked
      ? [...formData.favoriteFoods, foodItem]
      : formData.favoriteFoods.filter((f) => f !== foodItem);
    onChange('favoriteFoods', updatedFoods);
  };

  return (
    <Card className="w-full border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <Pizza className="h-5 w-5" />
          </div>
          <div>
            Food Preferences
            <CardDescription className="text-gray-500 mt-1">
              Select your favorite foods
            </CardDescription>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label className="text-base font-medium text-gray-700">What are your favorite foods? (Select all that apply)</Label>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg border-2 transition-colors ${
            errors.favoriteFoods ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
          }`}>
            {foodOptions.map((food) => (
              <div key={food} className="flex items-center space-x-3 p-3 rounded-md hover:bg-white transition-colors">
                <Checkbox
                  id={food}
                  checked={formData.favoriteFoods.includes(food)}
                  onCheckedChange={(checked) => handleFoodChange(food, checked as boolean)}
                  className={`h-5 w-5 ${errors.favoriteFoods ? 'text-red-500' : 'text-green-600'}`}
                />
                <Label htmlFor={food} className="cursor-pointer font-medium text-gray-700">{food}</Label>
              </div>
            ))}
          </div>
          {errors.favoriteFoods && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.favoriteFoods}
          </p>}
        </div>
      </CardContent>
    </Card>
  );
};