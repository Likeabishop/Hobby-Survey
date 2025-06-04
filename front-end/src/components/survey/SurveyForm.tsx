import type { SurveyData } from '@/lib/types';
import React, { useState, useEffect } from 'react';
import { Progress } from '../ui/progress';
import { submitSurvey } from '@/services/api';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { FoodPreferencesSection } from './FoodPreferencesSection';
import { RatingSection } from './RatingSection';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

// Survey Form Component
export const SurveyForm: React.FC<{ onSurveySubmitted: () => void }> = ({ onSurveySubmitted }) => {
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

