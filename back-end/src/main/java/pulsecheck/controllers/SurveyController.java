package pulsecheck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pulsecheck.DTOs.SurveyAnalyticsResponse;
import pulsecheck.DTOs.SurveySubmissionRequest;
import pulsecheck.entities.SurveyResponse;
import pulsecheck.services.SurveyService;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping
    public ResponseEntity<?> submitSurvey(@RequestBody SurveySubmissionRequest request) {
        try {
            SurveyResponse submittedSurvey = surveyService.submitSurvey(request);
            return new ResponseEntity<>(submittedSurvey, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Generic catch-all for unexpected errors
            return new ResponseEntity<>("An error occurred during survey submission: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getSurveyAnalytics() {
        SurveyAnalyticsResponse analytics = surveyService.getAnalytics();

        if (analytics == null || analytics.getTotalSurveys() == 0) {
            return new ResponseEntity<>("No Surveys Available.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(analytics, HttpStatus.OK);
        }
    }
}