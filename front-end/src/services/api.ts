const API_BASE_URL = 'http://localhost:5000/api';

interface SurveySubmission {
  fullName: string;
  email: string;
  contactNumber: string;
  age: number;
  dateOfBirth: string; 
  favoriteFoods: string[];
  ratingWatchMovies: number;
  ratingListenToRadio: number;
  ratingEatOut: number;
  ratingWatchTv: number;
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

export const submitSurvey = async (surveyData: SurveySubmission) => {
  try {
    const response = await fetch(`${API_BASE_URL}/survey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: surveyData.fullName,
        email: surveyData.email,
        contactNumber: surveyData.contactNumber,
        age: surveyData.age,
        dateOfBirth: surveyData.dateOfBirth,
        favoriteFoods: surveyData.favoriteFoods,
        ratingWatchMovies: surveyData.ratingWatchMovies,
        ratingListenToRadio: surveyData.ratingListenToRadio,
        ratingEatOut: surveyData.ratingEatOut,
        ratingWatchTv: surveyData.ratingWatchTv,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting survey:', error);
    throw error;
  }
};

export const fetchAnalytics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/survey/analytics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // In fetchAnalytics
    if (data === null || (typeof data === 'object' && data.totalSurveys === 0)) {
      return null;
    }
    
    // Handle case when no surveys exist
    if (typeof data === 'string' && data === 'No Surveys Available') {
      return null;
    }

    return data as SurveyAnalytics;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};