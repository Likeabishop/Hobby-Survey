package pulsecheck.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "survey_responses")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurveyResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID surveyId;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String contactNumber;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private Integer ratingWatchMovies;
    @Column(nullable = false)
    private Integer ratingListenToRadio;
    @Column(nullable = false)
    private Integer ratingEatOut;
    @Column(nullable = false)
    private Integer ratingWatchTv;

    @OneToMany(mappedBy = "surveyResponse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteFood> favoriteFoods = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}