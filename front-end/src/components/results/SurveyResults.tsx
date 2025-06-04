import type { SurveyAnalytics } from '@/lib/types';
import { fetchAnalytics } from '@/services/api';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

// Survey Results Component
export const SurveyResults: React.FC = () => {
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
        setAnalytics(data.data);
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
                <span className="text-blue-600 font-bold text-lg">{analytics?.averageWatchMoviesRating?.toFixed(1) ?? 'N/A'}</span>
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
                <span className="text-green-600 font-bold text-lg">{analytics?.averageListenToRadioRating?.toFixed(1) ?? 'N/A'}</span>
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
                <span className="text-purple-600 font-bold text-lg">{analytics?.averageEatOutRating?.toFixed(1) ?? 'N/A'}</span>
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
                <span className="text-orange-600 font-bold text-lg">{analytics?.averageWatchTvRating?.toFixed(1) ?? 'N/A'}</span>
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