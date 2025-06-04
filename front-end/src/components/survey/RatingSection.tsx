import type { SurveyData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Star } from "lucide-react";

// Rating Component
export const RatingSection: React.FC<{
  formData: SurveyData;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}> = ({ formData, errors, onChange }) => {
  const ratingItems = [
    { id: 'ratingWatchMovies', label: 'I like to watch movies' },
    { id: 'ratingListenToRadio', label: 'I like to listen to radio' },
    { id: 'ratingEatOut', label: 'I like to eat out' },
    { id: 'ratingWatchTv', label: 'I like to watch TV' },
  ];

  const handleRatingChange = (id: string, value: string) => {
    onChange(id, parseInt(value, 10));
  };

  return (
    <Card className="w-full border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <div className="p-2 rounded-full bg-purple-100 text-purple-600">
            <Star className="h-5 w-5" />
          </div>
          <div>
            Activity Preferences
            <CardDescription className="text-gray-500 mt-1">
              Rate your level of agreement (1 = Strongly Agree, 5 = Strongly Disagree)
            </CardDescription>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {ratingItems.map((item) => (
          <div key={item.id} className="space-y-3">
            <Label className="text-base font-medium text-gray-700">{item.label}</Label>
            <div className={`p-4 rounded-lg border-2 transition-colors ${
              errors[item.id] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <RadioGroup
                onValueChange={(value) => handleRatingChange(item.id, value)}
                value={formData[item.id as keyof SurveyData]?.toString() || ''}
                className="flex justify-between"
              >
                {['1', '2', '3', '4', '5'].map((rating) => (
                  <div key={rating} className="flex flex-col items-center space-y-2">
                    <RadioGroupItem 
                      value={rating} 
                      id={`${item.id}-${rating}`} 
                      className={`h-6 w-6 ${errors[item.id] ? 'text-red-500' : 'text-purple-600'}`}
                    />
                    <Label htmlFor={`${item.id}-${rating}`} className="text-sm font-medium cursor-pointer text-gray-700">
                      {rating}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                <span>Strongly Agree</span>
                <span>Strongly Disagree</span>
              </div>
            </div>
            {errors[item.id] && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors[item.id]}
            </p>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};