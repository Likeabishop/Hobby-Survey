package pulsecheck.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class SurveySubmissionRequest {
    private String fullName;
    private String email;
    private String contactNumber;
    private Integer age;
    private LocalDate dateOfBirth;
    private List<String> favoriteFoods;
    private Integer ratingWatchMovies;
    private Integer ratingListenToRadio;
    private Integer ratingEatOut;
    private Integer ratingWatchTv;
}