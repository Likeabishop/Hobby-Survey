import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarIcon, User, Mail, Phone, Cake, Pizza, Star, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { submitSurvey, fetchAnalytics } from './services/api';

// Types
interface SurveyData {
  fullName: string;
  email: string;
  contactNumber: string;
  age: number | null;
  dateOfBirth: string | null;
  favoriteFoods: string[];
  ratingWatchMovies: number | null;
  ratingListenToRadio: number | null;
  ratingEatOut: number | null;
  ratingWatchTv: number | null;
}

interface SurveyAnalytics {
  totalSurveys: number;
  averageAge: number;
  youngestAge: number;
  oldestAge: number;
  pizzaLoversPercentage: number;
  pastaLoversPercentage: number;
  papAndWorsLoversPercentage: number;
  averageWatchMoviesRating: number;
  averageListenToRadioRating: number;
  averageEatOutRating: number;
  averageWatchTvRating: number;
}

// Personal Details Component
const PersonalDetailsSection: React.FC<{
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

// Food Preferences Component
const FoodPreferencesSection: React.FC<{
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

// Rating Component
const RatingSection: React.FC<{
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

// Survey Form Component
const SurveyForm: React.FC<{ onSurveySubmitted: () => void }> = ({ onSurveySubmitted }) => {
  const [formData, setFormData] = useState<SurveyData>({
    fullName: '',
    email: '',
    contactNumber: '',
    age: null,
    dateOfBirth: null,
    favoriteFoods: [],
    ratingWatchMovies: null,
    ratingListenToRadio: null,
    ratingEatOut: null,
    ratingWatchTv: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionMessage, setSubmissionMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate form completion progress
    let completedFields = 0;
    const totalFields = 9; // Total required fields
    
    if (formData.fullName) completedFields++;
    if (formData.email) completedFields++;
    if (formData.contactNumber) completedFields++;
    if (formData.age !== null) completedFields++;
    if (formData.dateOfBirth) completedFields++;
    if (formData.favoriteFoods.length > 0) completedFields++;
    if (formData.ratingWatchMovies !== null) completedFields++;
    if (formData.ratingListenToRadio !== null) completedFields++;
    if (formData.ratingWatchTv !== null) completedFields++;
    
    setProgress(Math.round((completedFields / totalFields) * 100));
  }, [formData]);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required.';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.';

    if (formData.age === null) {
      newErrors.age = 'Age is required.';
    } else if (formData.age < 5 || formData.age > 120) {
      newErrors.age = 'Age must be between 5 and 120.';
    }

    if (formData.favoriteFoods.length === 0) newErrors.favoriteFoods = 'Please select at least one favorite food.';

    if (formData.ratingWatchMovies === null) newErrors.ratingWatchMovies = 'Rating for "Watch Movies" is required.';
    if (formData.ratingListenToRadio === null) newErrors.ratingListenToRadio = 'Rating for "Listen to Radio" is required.';
    if (formData.ratingEatOut === null) newErrors.ratingEatOut = 'Rating for "Eat Out" is required.';
    if (formData.ratingWatchTv === null) newErrors.ratingWatchTv = 'Rating for "Watch TV" is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionMessage(null);

    if (!validateForm()) {
      setSubmissionMessage({ type: 'error', message: 'Please correct the errors in the form.' });
      // Scroll to the first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(firstError)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Call backend API
      await submitSurvey({
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        age: formData.age!,
        dateOfBirth: formData.dateOfBirth!, // <-- Fix: include dateOfBirth
        favoriteFoods: formData.favoriteFoods,
        ratingWatchMovies: formData.ratingWatchMovies!,
        ratingListenToRadio: formData.ratingListenToRadio!,
        ratingEatOut: formData.ratingEatOut!,
        ratingWatchTv: formData.ratingWatchTv!,
      });

      setSubmissionMessage({ 
        type: 'success', 
        message: 'Survey submitted successfully! Thank you for your participation.' 
      });
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        age: null,
        dateOfBirth: null,
        favoriteFoods: [],
        ratingWatchMovies: null,
        ratingListenToRadio: null,
        ratingEatOut: null,
        ratingWatchTv: null,
      });
      onSurveySubmitted();
    } catch (error: any) {
      setSubmissionMessage({ 
        type: 'error', 
        message: 'An unexpected error occurred. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {submissionMessage && (
        <div className={`p-4 rounded-lg text-center font-medium shadow-sm ${
          submissionMessage.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {submissionMessage.message}
        </div>
      )}

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Survey Progress</h2>
          <div className="flex items-center gap-4">
            <Progress value={progress} className="h-3 flex-1" />
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <PersonalDetailsSection 
            formData={formData} 
            errors={errors} 
            onChange={handleFieldChange} 
          />
          
          <FoodPreferencesSection 
            formData={formData} 
            errors={errors} 
            onChange={handleFieldChange} 
          />
          
          <RatingSection 
            formData={formData} 
            errors={errors} 
            onChange={handleFieldChange} 
          />

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-1 shadow-inner">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Submit Survey
                    <ChevronRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Survey Results Component
const SurveyResults: React.FC = () => {
  const [analytics, setAnalytics] = useState<SurveyAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAnalytics();
      if (!data) {
        setAnalytics(null);
      } else {
        setAnalytics(data);
      }
    } catch (err) {
      setError('An unexpected error occurred while fetching analytics.');
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <h3 className="text-xl font-semibold text-gray-700">Loading survey results</h3>
              <p className="text-gray-500">Please wait while we process the data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-red-200 shadow-lg">
          <CardContent className="p-8 bg-red-50">
            <div className="flex flex-col items-center text-center space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-semibold text-red-700">Error Loading Data</h3>
              <p className="text-red-600">{error}</p>
              <Button 
                onClick={loadAnalytics}
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analytics || analytics.totalSurveys === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">No Survey Data Available</h3>
              <p className="text-gray-500">There are no survey results to display at this time.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Survey Analytics Dashboard</CardTitle>
          <CardDescription className="text-gray-600">
            Insights from {analytics.totalSurveys} participant{analytics.totalSurveys !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Participant Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Total Surveys:</span>
              <Badge className="bg-blue-100 text-blue-800 px-3 py-1 text-sm font-semibold">
                {analytics.totalSurveys}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Average Age:</span>
              <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm font-semibold">
                {analytics.averageAge}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Youngest Participant:</span>
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1 text-sm font-semibold">
                {analytics.youngestAge}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Oldest Participant:</span>
              <Badge className="bg-orange-100 text-orange-800 px-3 py-1 text-sm font-semibold">
                {analytics.oldestAge}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Food Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Pizza Lovers:</span>
                <span className="text-red-600 font-bold">{analytics.pizzaLoversPercentage}%</span>
              </div>
              <Progress value={analytics.pizzaLoversPercentage} className="h-2 bg-red-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Pasta Lovers:</span>
                <span className="text-yellow-600 font-bold">{analytics.pastaLoversPercentage}%</span>
              </div>
              <Progress value={analytics.pastaLoversPercentage} className="h-2 bg-yellow-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Pap and Wors Lovers:</span>
                <span className="text-green-600 font-bold">{analytics.papAndWorsLoversPercentage}%</span>
              </div>
              <Progress value={analytics.papAndWorsLoversPercentage} className="h-2 bg-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Activity Preferences (Average Ratings)
          </CardTitle>
          <CardDescription className="text-gray-500">
            Lower scores indicate stronger agreement (1 = Strongly Agree, 5 = Strongly Disagree)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Watch Movies:</span>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold text-lg">{analytics.averageWatchMoviesRating.toFixed(1)}</span>
                <div className="w-16 bg-blue-100 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(1 - (analytics.averageWatchMoviesRating - 1) / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Listen to Radio:</span>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-lg">{analytics.averageListenToRadioRating.toFixed(1)}</span>
                <div className="w-16 bg-green-100 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${(1 - (analytics.averageListenToRadioRating - 1) / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Eat Out:</span>
              <div className="flex items-center gap-2">
                <span className="text-purple-600 font-bold text-lg">{analytics.averageEatOutRating.toFixed(1)}</span>
                <div className="w-16 bg-purple-100 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${(1 - (analytics.averageEatOutRating - 1) / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Watch TV:</span>
              <div className="flex items-center gap-2">
                <span className="text-orange-600 font-bold text-lg">{analytics.averageWatchTvRating.toFixed(1)}</span>
                <div className="w-16 bg-orange-100 rounded-full h-2.5">
                  <div 
                    className="bg-orange-600 h-2.5 rounded-full" 
                    style={{ width: `${(1 - (analytics.averageWatchTvRating - 1) / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'survey' | 'results'>('survey');
  const [surveySubmittedCount, setSurveySubmittedCount] = useState(0);

  const handleSurveySubmitted = () => {
    setSurveySubmittedCount(prev => prev + 1);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Card className="bg-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Survey Platform
                  </h1>
                </div>
                <nav className="flex gap-2">
                  <Button
                    variant={activeTab === 'survey' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('survey')}
                    className={`transition-all duration-300 rounded-full px-6 h-11 ${
                      activeTab === 'survey' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg' 
                        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-200'
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Fill Out Survey
                  </Button>
                  <Button
                    variant={activeTab === 'results' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('results')}
                    className={`transition-all duration-300 rounded-full px-6 h-11 ${
                      activeTab === 'results' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg' 
                        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-200'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Results
                  </Button>
                </nav>
              </div>
            </CardContent>
          </Card>
        </header>

        <main className="transition-all duration-300">
          {activeTab === 'survey' && <SurveyForm onSurveySubmitted={handleSurveySubmitted} />}
          {activeTab === 'results' && <SurveyResults key={surveySubmittedCount} />}
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Survey Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
