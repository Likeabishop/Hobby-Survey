import asyncHandler from "express-async-handler";
import * as FavouriteFood from '../models/favouriteFood.model.js';
export const getFavouriteFoods = asyncHandler(async (req, res) => {
    const foodId = req.params.id;
    const favouriteFood = await FavouriteFood.getFavouriteFood(foodId);
    if (!favouriteFood) {
        res.status(404).json({ message: 'No favourite food found.' });
    }
    res.status(200).json(favouriteFood);
});
export const getFavouriteFood = asyncHandler(async (req, res) => {
    const favouriteFood = await FavouriteFood.getFavouriteFoods();
    if (!favouriteFood) {
        res.status(404).json({ message: 'Favourite food not found.' });
    }
    res.status(200).json(favouriteFood);
});
export const createFavouriteFood = asyncHandler(async (req, res) => {
    const { foodId, fullName, email, contactNumber, age, dateOfBirth, ratingWatchMovies, ratingListenToRadio, ratingEatOut, ratingWatchTv, favoriteFoods } = req.body;
    if (!foodId || !fullName || !email || !contactNumber || age || dateOfBirth || ratingWatchMovies || ratingListenToRadio || ratingEatOut || ratingWatchTv || !favoriteFoods) {
        res.status(400).json({ message: 'All fields are required' });
    }
    const favouriteFood = await FavouriteFood.createFavouriteFood(req.body);
    res.status(201).json({ message: 'Favourite food created successfully', favouriteFood });
});
export const updateFavouriteFood = asyncHandler(async (req, res) => {
    const foodId = req.params.id;
    const food = req.body;
    const surveyResponse = await FavouriteFood.updateFavouriteFood(foodId, food);
    if (!surveyResponse) {
        res.status(404).json({ message: 'Favourite food not found' });
    }
});
export const deleteFavouriteFood = asyncHandler(async (req, res) => {
    const surveyId = req.params.id;
    const surveyResponse = await FavouriteFood.deleteFavouriteFood(surveyId);
    if (!surveyResponse) {
        res.status(404).json({ message: 'Favourite food not found' });
    }
});
//# sourceMappingURL=favouriteFood.controller.js.map