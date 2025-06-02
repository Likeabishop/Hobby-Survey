package pulsecheck.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pulsecheck.DTOs.SurveyAnalyticsResponse;
import pulsecheck.DTOs.SurveySubmissionRequest;
import pulsecheck.entities.FavoriteFood;
import pulsecheck.entities.SurveyResponse;
import pulsecheck.repositories.FavoriteFoodRepository;
import pulsecheck.repositories.SurveyResponseRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SurveyService {
    @Autowired
    private SurveyResponseRepository surveyRepo;

    @Autowired
    private FavoriteFoodRepository foodRepo;

    @Transactional
    public SurveyResponse submitSurvey(SurveySubmissionRequest request) {
        // --- Validation Logic ---
        // Validate personal details are not empty [cite: 32]
        if (request.getFullName() == null || request.getFullName().trim().isEmpty() ||
                request.getEmail() == null || request.getEmail().trim().isEmpty() ||
                request.getContactNumber() == null || request.getContactNumber().trim().isEmpty() ||
                request.getDateOfBirth() == null) {
            throw new IllegalArgumentException("Personal details cannot be empty.");
        }

        // Validate age [cite: 33]
        if (request.getAge() == null || request.getAge() < 5 || request.getAge() > 120) {
            throw new IllegalArgumentException("Age must be between 5 and 120.");
        }

        // Validate all rating questions are selected [cite: 34]
        if (request.getRatingWatchMovies() == null ||
                request.getRatingListenToRadio() == null ||
                request.getRatingEatOut() == null ||
                request.getRatingWatchTv() == null) {
            throw new IllegalArgumentException("All rating questions must be answered.");
        }
        // --- End Validation Logic ---


        SurveyResponse survey = new SurveyResponse();
        survey.setFullName(request.getFullName());
        survey.setEmail(request.getEmail());
        survey.setContactNumber(request.getContactNumber());
        survey.setAge(request.getAge());
        survey.setDateOfBirth(request.getDateOfBirth());
        survey.setRatingWatchMovies(request.getRatingWatchMovies());
        survey.setRatingListenToRadio(request.getRatingListenToRadio());
        survey.setRatingEatOut(request.getRatingEatOut());
        survey.setRatingWatchTv(request.getRatingWatchTv());

        // Assign the saved survey to a final (or effectively final) variable
        final SurveyResponse savedSurvey = surveyRepo.save(survey);

        List<FavoriteFood> foods = request.getFavoriteFoods().stream()
                .map(food -> {
                    FavoriteFood f = new FavoriteFood();
                    f.setFoodItem(food);
                    f.setSurveyResponse(savedSurvey); // Use the final variable here
                    return f;
                }).collect(Collectors.toList());
        foodRepo.saveAll(foods);

        return savedSurvey; // Return the saved survey
    }

    public SurveyAnalyticsResponse getAnalytics() {
        long total = surveyRepo.count();
        if (total == 0) {
            return null;
        }

        Double avgAge = surveyRepo.findAverageAge();
        Integer minAge = surveyRepo.findMinAge();
        Integer maxAge = surveyRepo.findMaxAge();
        Double avgEatOut = surveyRepo.findAverageEatOutRating();
        Double avgWatchMovies = surveyRepo.findAverageWatchMoviesRating();
        Double avgListenToRadio = surveyRepo.findAverageListenToRadioRating();
        Double avgWatchTv = surveyRepo.findAverageWatchTvRating();

        long pizzaCount = foodRepo.countDistinctSurveyResponseIdByFoodItem("Pizza");
        long pastaCount = foodRepo.countDistinctSurveyResponseIdByFoodItem("Pasta");
        long papAndWorsCount = foodRepo.countDistinctSurveyResponseIdByFoodItem("Pap and Wors");

        double pizzaPercentage = (double) pizzaCount / total * 100.0;
        double pastaPercentage = (double) pastaCount / total * 100.0;
        double papAndWorsPercentage = (double) papAndWorsCount / total * 100.0;


        SurveyAnalyticsResponse analytics = new SurveyAnalyticsResponse();
        analytics.setTotalSurveys(total);
        analytics.setAverageAge(avgAge != null ? Math.round(avgAge * 10.0) / 10.0 : 0.0);
        analytics.setYoungestAge(minAge != null ? minAge : 0);
        analytics.setOldestAge(maxAge != null ? maxAge : 0);
        analytics.setPizzaLoversPercentage(Math.round(pizzaPercentage * 10.0) / 10.0);
        analytics.setPastaLoversPercentage(Math.round(pastaPercentage * 10.0) / 10.0);
        analytics.setPapAndWorsLoversPercentage(Math.round(papAndWorsPercentage * 10.0) / 10.0);
        analytics.setAverageWatchMoviesRating(avgWatchMovies != null ? Math.round(avgWatchMovies * 10.0) / 10.0 : 0.0);
        analytics.setAverageListenToRadioRating(avgListenToRadio != null ? Math.round(avgListenToRadio * 10.0) / 10.0 : 0.0);
        analytics.setAverageEatOutRating(avgEatOut != null ? Math.round(avgEatOut * 10.0) / 10.0 : 0.0);
        analytics.setAverageWatchTvRating(avgWatchTv != null ? Math.round(avgWatchTv * 10.0) / 10.0 : 0.0);

        return analytics;
    }
}