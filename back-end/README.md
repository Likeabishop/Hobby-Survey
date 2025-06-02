# PulseCheck Survey Application 📊

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

A Spring Boot application designed to gather and analyze survey data on people's lifestyle preferences. Provides a RESTful API for submitting survey responses and retrieving analytical insights from the collected data.

## 🌟 Features

- **Survey Submission**: Capture personal details, favorite foods, and lifestyle ratings
- **Data Storage**: Persist responses in PostgreSQL database
- **Data Analytics**: Calculate insights including:
    - Total surveys completed
    - Average, youngest, and oldest age
    - Favorite food percentages (Pizza, Pasta, Pap and Wors)
    - Average lifestyle ratings (eating out, movies, radio, TV)
- **Input Validation**: Ensure data integrity with validation rules

## 🛠 Technologies Used

- **Backend**: Spring Boot 3.5.0
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA with Hibernate
- **Utilities**: Lombok
- **Build Tool**: Maven
- **Language**: Java 21

## 🚀 Project Setup

### Prerequisites

- JDK 21
- Maven 3.6.0+
- PostgreSQL 12+

### Database Configuration

Configure your database connection in `src/main/resources/application.properties`:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
```

Set environment variables:

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/pulsecheck
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=yourpassword
```

### Running the Application

1. Clone the repository:
   ```
   After cloning the repository and updating the database configuration, you can run the application using Maven commands.
   ```

2. Build and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. The application will start on port 8090

## 📡 API Endpoints

Base URL: `http://localhost:8090/api/surveys`

### Submit Survey (POST)

**Request:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "age": 25,
  "favoriteFoods": ["Pizza", "Pap and Wors"],
  "ratingWatchMovies": 4,
  "ratingListenToRadio": 5,
  "ratingEatOut": 3,
  "ratingWatchTv": 4
}
```

**Success Response (201 Created):**
```json
{
  "surveyId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "fullName": "Jane Doe",
  "age": 25,
  "favoriteFoods": [
    {"foodItem": "Pizza"},
    {"foodItem": "Pap and Wors"}
  ],
  "createdAt": "2024-06-02T16:30:00.123456789"
}
```

### Get Survey Analytics (GET)

**Success Response (200 OK):**
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

**No Data Response (200 OK):**
```json
"No Surveys Available"
```

## 📂 Project Structure

```
pulsecheck/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── pulsecheck/
│   │   │       ├── controllers/       # API endpoints
│   │   │       ├── DTOs/             # Data transfer objects
│   │   │       ├── entities/         # JPA entities
│   │   │       ├── repositories/     # Database repositories
│   │   │       ├── services/         # Business logic
│   │   │       └── Application.java
│   │   └── resources/                # Config files
│   └── test/                         # Test classes
└── pom.xml                           # Maven config
```
