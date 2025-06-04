import type { SurveyData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Cake, CalendarIcon, Mail, Phone, User } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

// Personal Details Component
export const PersonalDetailsSection: React.FC<{
  formData: SurveyData;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}> = ({ formData, errors, onChange }) => {
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange('dateOfBirth', `${year}-${month}-${day}`);
    } else {
      onChange('dateOfBirth', null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange('age', value === '' ? null : parseInt(value, 10));
  };

  return (
    <Card className="w-full border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <User className="h-5 w-5" />
          </div>
          <div>
            Personal Details
            <CardDescription className="text-gray-500 mt-1">
              Tell us about yourself
            </CardDescription>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-700">
              <User className="h-4 w-4 text-blue-500" />
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className={`${errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'} h-11`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.fullName}
            </p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
              <Mail className="h-4 w-4 text-blue-500" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className={`${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'} h-11`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="flex items-center gap-2 text-gray-700">
              <Phone className="h-4 w-4 text-blue-500" />
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              type="text"
              value={formData.contactNumber}
              onChange={(e) => onChange('contactNumber', e.target.value)}
              className={`${errors.contactNumber ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'} h-11`}
              placeholder="+277 123 4567"
            />
            {errors.contactNumber && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.contactNumber}
            </p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center gap-2 text-gray-700">
              <Cake className="h-4 w-4 text-blue-500" />
              Age
            </Label>
            <Input
              id="age"
              type="number"
              value={formData.age === null ? '' : formData.age}
              onChange={handleAgeChange}
              className={`${errors.age ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'} h-11`}
              placeholder="25"
              min="5"
              max="120"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.age}
            </p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-gray-700">
            <CalendarIcon className="h-4 w-4 text-blue-500" />
            Date of Birth
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal h-11 ${
                  !formData.dateOfBirth ? "text-gray-400" : "text-gray-800"
                } ${errors.dateOfBirth ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-blue-400"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? formatDate(formData.dateOfBirth) : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-xl rounded-lg border-gray-200">
              <Calendar
                mode="single"
                selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined}
                onSelect={handleDateChange}
                initialFocus
                className="border-0"
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.dateOfBirth}
          </p>}
        </div>
      </CardContent>
    </Card>
  );
};