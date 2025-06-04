import express from 'express';
import {
    deleteSurveyResponse,
    updateSurveyResponse,
    getSurveyResponses,
    getSurveyResponse,
    createSurveyResponse,
    getSurveyAnalytics
} from '../controllers/surveyResponse.controller.js';

const router = express.Router();

router.get('/analytics', getSurveyAnalytics);
router.get('/', getSurveyResponses);
router.post('/', createSurveyResponse);
router.get('/:id', getSurveyResponse);
router.put('/:id/', updateSurveyResponse);
router.delete('/:id', deleteSurveyResponse);

export default router;
