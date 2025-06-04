import db from "../utils/db.js";
import { v4 as uuidv4 } from 'uuid';

const getSurveyResponses = async () => {
    try {
        const result = await db.query("SELECT * FROM SurveyResponse");
        console.log('rows:', result.rows);
        return result.rows;
    } catch (err) {
        console.error("Error fetching survey responses:", err);
        throw err;
    }
};


const getSurveyResponse = async (surveyId) => {
    try {
        const result = await db.query("SELECT * FROM SurveyResponse WHERE surveyId = $1", [surveyId]);
        const row = result.rows[0];

        if (row && row.favoriteFoods) {
            row.favoriteFoods = typeof row.favoriteFoods === 'string' 
                ? JSON.parse(row.favoriteFoods) 
                : row.favoriteFoods;
        }

        return row;
    } catch (err) {
        console.error("Error getting survey response:", err);
        throw err;
    }
};



const createSurveyResponse = async (obj) => {
    try {
        const surveyId = uuidv4();
        const CreatedAt = new Date();

        // Convert array to JSON string
        const favoriteFoods = JSON.stringify(obj.favoriteFoods);

        const data = await db.query(`
            INSERT INTO SurveyResponse (
                surveyId, fullName, email, age, dateOfBirth, 
                ratingWatchMovies, ratingListenToRadio, 
                ratingEatOut, ratingWatchTv, favoriteFoods, CreatedAt
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
                surveyId, 
                obj.fullName, 
                obj.email, 
                obj.age, 
                obj.dateOfBirth, 
                obj.ratingWatchMovies, 
                obj.ratingListenToRadio, 
                obj.ratingEatOut, 
                obj.ratingWatchTv, 
                favoriteFoods, // JSON string
                CreatedAt
            ]
        );
        return data;
    } catch (err) {
        console.error("Error creating survey response:", err);
        throw err;
    }
};

const updateSurveyResponse = async (surveyId, obj) => {
    try {
        const updatedAt = new Date();
        const favoriteFoods = JSON.stringify(obj.favoriteFoods);

        const data = await db.query(`
            UPDATE SurveyResponse 
            SET fullName = $1, email = $2, age = $3, dateOfBirth = $4,
                ratingWatchMovies = $5, ratingListenToRadio = $6,
                ratingEatOut = $7, ratingWatchTv = $8, 
                favoriteFoods = $9, UpdatedAt = $10
            WHERE surveyId = $11`,
            [
                obj.fullName,
                obj.email,
                obj.age,
                obj.dateOfBirth,
                obj.ratingWatchMovies,
                obj.ratingListenToRadio,
                obj.ratingEatOut,
                obj.ratingWatchTv,
                favoriteFoods,
                updatedAt,
                surveyId
            ]
        );
        return data;
    } catch (err) {
        console.error("Error updating survey response:", err);
        throw err;
    }
};


const deleteSurveyResponse = async (surveyId) => {
    try {
        const data = await db.query(`
            DELETE FROM SurveyResponse 
            WHERE surveyId = $1`,
            [surveyId]
        );
        return data;
    } catch (err) {
        console.error("Error deleting survey response:", err);
        throw err;
    }
};

const getSurveyAnalytics = async () => {
  try {
    const result = await db.query("SELECT * FROM SurveyResponse");
    const rows = result.rows;

    const totalSurveys = rows.length;

    // In getSurveyAnalytics (model)
    if (totalSurveys === 0) {
        return null; // Instead of zero-values object
    }

    // Age statistics
    const ages = rows.map(r => r.age);
    const averageAge = Math.round(ages.reduce((sum, age) => sum + age, 0) / totalSurveys);
    const youngestAge = Math.min(...ages);
    const oldestAge = Math.max(...ages);

    // Food preference counts
    let pizzaCount = 0;
    let pastaCount = 0;
    let papAndWorsCount = 0;

    rows.forEach(r => {
  let foods = r.favoritefoods;
  
  // Ensure we're working with an array
  if (typeof foods === 'string') {
    try {
      foods = JSON.parse(foods);
    } catch (e) {
      console.error('Error parsing favoriteFoods:', e);
      foods = [];
    }
  }
  
  // Make sure foods is an array before processing
  if (Array.isArray(foods)) {
    // Case-insensitive comparison
    const lowerCaseFoods = foods.map(food => food.toLowerCase());
    if (lowerCaseFoods.includes('pizza')) pizzaCount++;
    if (lowerCaseFoods.includes('pasta')) pastaCount++;
    if (lowerCaseFoods.includes('pap and wors')) papAndWorsCount++;
  }
});

    // Ratings
    const avg = (field) => rows.reduce((sum, r) => sum + (r[field] || 0), 0) / totalSurveys;
    
    return {
      totalSurveys,
      averageAge,
      youngestAge,
      oldestAge,
      pizzaLoversPercentage: Math.round((pizzaCount / totalSurveys) * 100),
      pastaLoversPercentage: Math.round((pastaCount / totalSurveys) * 100),
      papAndWorsLoversPercentage: Math.round((papAndWorsCount / totalSurveys) * 100),
      averageWatchMoviesRating: avg('ratingwatchmovies'),
      averageListenToRadioRating: avg('ratinglistentoradio'),
      averageEatOutRating: avg('ratingeatout'),
      averageWatchTvRating: avg('ratingwatchtv')
    };

  } catch (err) {
    console.error("Error fetching survey analytics:", err);
    throw err;
  }
};


export default {
    getSurveyResponses,
    getSurveyResponse,
    createSurveyResponse,
    updateSurveyResponse,
    deleteSurveyResponse,
    getSurveyAnalytics
};