import db from "../utils/db.js";
import { v4 as uuidv4 } from 'uuid';
export const getFavouriteFoods = async () => {
    const [rows] = await db.query("SELECT * FROM FavouriteFood").catch(err => console.log(err));
    return rows;
};
export const getFavouriteFood = async (foodId) => {
    const [row] = await db.query("SELECT * FROM FavouriteFood WHERE foodId = ?", [foodId]).catch(err => console.log(err));
    return row;
};
export const createFavouriteFood = async (obj) => {
    const foodId = uuidv4();
    const data = await db.query(`
        INSERT INTO FavouriteFood (
            foodId, surveyResponse, foodItem
        ) VALUES (?, ?, ?)`, [foodId, obj.surveyResponse, obj.foodItem]).catch(err => console.log(err));
    return data;
};
export const updateFavouriteFood = async (foodId, obj) => {
    const data = await db.query(`
        UPDATE FavouriteFood 
        SET FileName = ?, FileDescription = ?, FileType = ?, UpdatedAt = ?, UpdatedBy = ?
        WHERE foodId = ?`, [obj.FileName, obj.FileDescription, obj.FileType, obj.UpdatedBy, foodId]).catch(err => console.log(err));
    return data;
};
export const deleteFavouriteFood = async (foodId) => {
    const data = await db.query(`
        DELETE FavouriteFood 
        WHERE foodId = ?`, [foodId]).catch(err => console.log(err));
    return data;
};
//# sourceMappingURL=favouriteFood.model.js.map