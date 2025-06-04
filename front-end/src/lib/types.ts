export interface SurveyData {
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

export interface SurveyAnalytics {
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