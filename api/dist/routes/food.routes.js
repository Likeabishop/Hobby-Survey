import express from 'express';
import { deleteFavouriteFood, updateFavouriteFood, getFavouriteFood, getFavouriteFoods, createFavouriteFood } from '../controllers/favouriteFood.controller.js';
const router = express.Router();
router.get('/', getFavouriteFoods);
router.post('/', createFavouriteFood);
router.get('/:id', getFavouriteFood);
router.put('/:id/', updateFavouriteFood);
router.delete('/:id', deleteFavouriteFood);
export default router;
//# sourceMappingURL=food.routes.js.map