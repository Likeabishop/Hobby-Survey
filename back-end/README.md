# PulseCheck Backend

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

A Spring Boot application for collecting and analyzing survey data on lifestyle and food preferences.

## 🌟 Features

- **Survey Submission**: Capture personal details, favorite foods, and lifestyle ratings
- **Data Storage**: Persist responses in PostgreSQL
- **Analytics**: Calculate total surveys, age stats, food preferences, and average ratings
- **Validation**: Ensures all required fields are present and valid

## 🛠 Technologies Used

- **Spring Boot 3.5.0**
- **Java 21**
- **PostgreSQL**
- **Spring Data JPA**
- **Lombok**
- **Maven**

## 🚀 Setup

### Prerequisites

- JDK 21
- Maven 3.6.0+
- PostgreSQL 12+

### Database Configuration

Edit `src/main/resources/application.properties` or use environment variables:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
```

Set environment variables (recommended):

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/pulsecheck
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=yourpassword
```

### Run the Application

```bash
cd back-end
mvn clean install
mvn spring-boot:run
```

The backend will start on port **8090**.

## 📡 API Endpoints

Base URL: `http://localhost:8090/api/surveys`

### Submit Survey (POST)

**Request:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "contactNumber": "+2771234567",
  "age": 25,
  "dateOfBirth": "1999-01-01",
  "favoriteFoods": ["Pizza", "Pap and Wors"],
  "ratingWatchMovies": 4,
  "ratingListenToRadio": 5,
  "ratingEatOut": 3,
  "ratingWatchTv": 4
}
```

**Response (201 Created):**
```json
{
  "surveyId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "contactNumber": "+2771234567",
  "age": 25,
  "dateOfBirth": "1999-01-01",
  "favoriteFoods": [
    {"foodItem": "Pizza"},
    {"foodItem": "Pap and Wors"}
  ],
  "createdAt": "2024-06-02T16:30:00.123456789"
}
```

### Get Survey Analytics (GET)

**Endpoint:** `/api/surveys/analytics`

**Response:**
```json
{
  "totalSurveys": 5,
  "averageAge": 32.5,
  "youngestAge": 20,
  "oldestAge": 55,
  "pizzaLoversPercentage": 60.0,
  "pastaLoversPercentage": 40.0,
  "papAndWorsLoversPercentage": 20.0,
  "averageWatchMoviesRating": 3.8,
  "averageListenToRadioRating": 4.2,
  "averageEatOutRating": 3.5,
  "averageWatchTvRating": 2.9
}
```

**No Data Response:**
```json
"No Surveys Available."
```

## 📂 Backend Structure

```
back-end/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── pulsecheck/
│   │   │       ├── controllers/       # API endpoints
│   │   │       ├── DTOs/              # Data transfer objects
│   │   │       ├── entities/          # JPA entities
│   │   │       ├── repositories/      # Database repositories
│   │   │       ├── services/          # Business logic
│   │   │       └── PulsecheckApplication.java
│   │   └── resources/                 # Config files
│   └── test/                          # Test classes
└── pom.xml                            # Maven config
```

---
