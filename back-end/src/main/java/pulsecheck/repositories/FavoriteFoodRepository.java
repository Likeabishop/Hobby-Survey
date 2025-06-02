package pulsecheck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pulsecheck.entities.FavoriteFood;

import java.util.UUID;

public interface FavoriteFoodRepository extends JpaRepository<FavoriteFood, UUID> {

    @Query("SELECT COUNT(DISTINCT f.surveyResponse.id) FROM FavoriteFood f WHERE f.foodItem = :foodItem")
    long countDistinctSurveyResponseIdByFoodItem(@Param("foodItem") String foodItem);
}