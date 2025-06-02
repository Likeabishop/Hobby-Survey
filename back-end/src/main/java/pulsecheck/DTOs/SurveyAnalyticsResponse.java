package pulsecheck.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SurveyAnalyticsResponse {
    private long totalSurveys;
    private double averageAge;
    private int youngestAge;
    private int oldestAge;
    private double pizzaLoversPercentage;
    private double pastaLoversPercentage;
    private double papAndWorsLoversPercentage;
    private double averageWatchMoviesRating;
    private double averageListenToRadioRating;
    private double averageEatOutRating;
    private double averageWatchTvRating;
}