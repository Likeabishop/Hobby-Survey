package pulsecheck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pulsecheck.entities.SurveyResponse;
import org.springframework.data.jpa.repository.Query;
import java.util.UUID;

public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, UUID> {
    @Query("SELECT AVG(s.age) FROM SurveyResponse s")
    Double findAverageAge();

    @Query("SELECT MIN(s.age) FROM SurveyResponse s")
    Integer findMinAge();

    @Query("SELECT MAX(s.age) FROM SurveyResponse s")
    Integer findMaxAge();

    @Query("SELECT AVG(s.ratingEatOut) FROM SurveyResponse s")
    Double findAverageEatOutRating();

    @Query("SELECT AVG(s.ratingWatchMovies) FROM SurveyResponse s")
    Double findAverageWatchMoviesRating();

    @Query("SELECT AVG(s.ratingListenToRadio) FROM SurveyResponse s")
    Double findAverageListenToRadioRating();

    @Query("SELECT AVG(s.ratingWatchTv) FROM SurveyResponse s")
    Double findAverageWatchTvRating();
}