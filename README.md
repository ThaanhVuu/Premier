# Premier League Management System

## Overview
Premier League Management System is a comprehensive football league management platform built with Spring Boot. It provides features for managing teams, players, matches, stadiums, news, and user authentication. The system supports multiple user roles and offers real-time match event tracking.

## Tech Stack
- **Java 21**
- **Spring Boot 3.4.4**
- **Spring Security**
- **Spring Data JPA**
- **PostgreSQL**
- **MapStruct**
- **Lombok**
- **Spring Mail**
- **Spring Actuator**
- **OAuth2 Resource Server**

## Core Features

### User Management
- User registration and authentication
- Role-based access control (Admin, Manager, User)
- User profile management
- Activity logging

### Team Management
- Team CRUD operations
- Player management
- Team statistics and standings
- Team performance tracking

### Match Management
- Match scheduling and management
- Real-time match event tracking
- Match statistics
- Match status updates
- Match results and scores

### Stadium Management
- Stadium information management
- Capacity and facilities tracking
- Location management

### News Management
- News article publishing
- News categorization
- News updates and management

### Statistics and Analytics
- Team standings
- Player statistics
- Match statistics
- Performance analytics

## Project Structure
```
src/main/java/com/thanhvu/Premier/
├── config/         # Application configurations
├── controller/     # REST API endpoints
│   ├── AuthenticationController
│   ├── MatchController
│   ├── MatchEventController
│   ├── NewsController
│   ├── PlayerController
│   ├── StadiumController
│   ├── StandingController
│   ├── TeamController
│   └── UserController
├── dto/           # Data Transfer Objects
├── entity/        # Database entities
│   ├── Match
│   ├── MatchEvent
│   ├── News
│   ├── Player
│   ├── Stadium
│   ├── Standing
│   ├── Team
│   └── User
├── exceptions/    # Custom exception handlers
├── mapper/        # Object mapping (MapStruct)
├── repository/    # Data access layer
├── service/       # Business logic
└── PremierApplication.java  # Application entry point
```

## Getting Started

### Prerequisites
- JDK 21 or higher
- Maven 3.6 or higher
- PostgreSQL database
- IDE (IntelliJ IDEA recommended)

### 1. Clone the repository
```bash
git clone [repository-url]
cd Premier
```

### 2. Configure Database
Create a PostgreSQL database and update `application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/premier_league
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Build the project
```bash
mvn clean install
```

### 4. Run the application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout

### Teams
- GET `/api/teams` - Get all teams
- GET `/api/teams/{id}` - Get team by ID
- POST `/api/teams` - Create new team
- PUT `/api/teams/{id}` - Update team
- DELETE `/api/teams/{id}` - Delete team

### Matches
- GET `/api/matches` - Get all matches
- GET `/api/matches/{id}` - Get match by ID
- POST `/api/matches` - Create new match
- PUT `/api/matches/{id}` - Update match
- DELETE `/api/matches/{id}` - Delete match

### Players
- GET `/api/players` - Get all players
- GET `/api/players/{id}` - Get player by ID
- POST `/api/players` - Create new player
- PUT `/api/players/{id}` - Update player
- DELETE `/api/players/{id}` - Delete player

### Stadiums
- GET `/api/stadiums` - Get all stadiums
- GET `/api/stadiums/{id}` - Get stadium by ID
- POST `/api/stadiums` - Create new stadium
- PUT `/api/stadiums/{id}` - Update stadium
- DELETE `/api/stadiums/{id}` - Delete stadium

### News
- GET `/api/news` - Get all news
- GET `/api/news/{id}` - Get news by ID
- POST `/api/news` - Create news article
- PUT `/api/news/{id}` - Update news
- DELETE `/api/news/{id}` - Delete news

## Security
- JWT-based authentication
- Role-based authorization
- Password encryption
- Secure API endpoints
- CORS configuration

## Monitoring
Spring Actuator endpoints are available for monitoring:
- Health check: `/actuator/health`
- Metrics: `/actuator/metrics`
- Application info: `/actuator/info`

## Development
### Code Style
- Follow Java coding conventions
- Use Lombok annotations to reduce boilerplate
- Implement proper exception handling
- Write unit tests for new features

### Best Practices
- Use DTOs for data transfer
- Implement proper validation
- Follow REST API best practices
- Write meaningful commit messages

## Testing
```bash
mvn test
```

## Docker Support
The project includes a Dockerfile for containerization:
```bash
docker build -t premier-backend .
docker run -p 8080:8080 premier-backend
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Contact
Thanh Vu - [Gmail](Thanhvu7623@gmail.com)
Project Link: [https://github.com/ThaanhVuu/Premier](https://github.com/ThaanhVuu/Premier)
