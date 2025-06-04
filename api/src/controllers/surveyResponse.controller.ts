import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import SurveyResponse from '../models/surveyResponse.model.js';

export const getSurveyResponses = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const surveyResponses = await SurveyResponse.getSurveyResponses();
    
    if (!surveyResponses) {
        res.status(404).json({ message: 'No survey responses found.' });
        return;
    }

    res.status(200).json(surveyResponses);
});

export const getSurveyResponse = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const surveyId = req.params.id;
    const surveyResponse = await SurveyResponse.getSurveyResponse(surveyId);
    
    if (!surveyResponse) {
        res.status(404).json({ message: 'Survey response not found.' });
        return;
    }

    res.status(200).json(surveyResponse);
});

export const createSurveyResponse = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { fullName, email, contactNumber, age, dateOfBirth, ratingWatchMovies, ratingListenToRadio, ratingEatOut, ratingWatchTv, favoriteFoods } = req.body;

    if (
        !fullName || !email || !contactNumber || !age ||
        !dateOfBirth || !ratingWatchMovies || !ratingListenToRadio ||
        !ratingEatOut || !ratingWatchTv || !favoriteFoods
    ) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    const surveyResponse = await SurveyResponse.createSurveyResponse(req.body);
    res.status(201).json({ message: 'Survey response created successfully', surveyResponse });
});

export const updateSurveyResponse = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const surveyId = req.params.id;
    const updatedSurvey = await SurveyResponse.updateSurveyResponse(surveyId, req.body);

    if (!updatedSurvey) {
        res.status(404).json({ message: 'Survey response not found' });
        return;
    }

    res.status(200).json({ message: 'Survey Response updated successfully', updatedSurvey });
});

export const deleteSurveyResponse = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const surveyId = req.params.id;
    const deleted = await SurveyResponse.deleteSurveyResponse(surveyId);

    if (!deleted) {
        res.status(404).json({ message: 'Survey Response not found' });
        return;
    }

    res.status(200).json({ message: 'Survey Response deleted successfully' });
});

export const getSurveyAnalytics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const analytics = await SurveyResponse.getSurveyAnalytics();

      res.status(200).json({
        message: 'Survey analytics fetched successfully',
        data: analytics
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch analytics', error: err.message });
    }
  }
);