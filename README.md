# ⚽ Football Info Management System

This is a web-based football information management system with three user roles: Admin, Manager, and Guest User. The system allows managing stadiums, clubs, matches, match results, players, and news, along with user authentication and authorization using JWT.

## 🚀 Technologies

### Frontend

- HTML5, CSS3, JavaScript (vanilla)
- Responsive design with Bootstrap 5
- AJAX for API communication
- Local storage for token management

### Backend

- Spring Boot 3.x
- Spring Security with JWT
- Spring Data JPA
- SQLite Database
- Maven for dependency management

### Development Tools

- Git for version control
- Maven for build automation
- Postman for API testing

## 👥 User Roles and Features

### 👤 Guest User (No login required)

- View all public information:
  - Stadiums
  - Clubs
  - Players
  - Matches
  - Match results
  - News
- Search and filter functionality
- View match statistics

### 👨‍💼 Manager (Login required)

- Add / Edit / Delete / Search:
  - Stadiums
  - Clubs
  - Players
  - Matches
  - Match results
  - News
- View statistics (goals, match results, players per club, etc.)
- Manage match schedules
- Update match results and statistics

### 🛠 Admin (Login required)

- Manage user accounts (view/edit/assign roles)
- Backup system data
- View global statistics
- Monitor system logs
- Manage system configurations

## 🔐 Authentication & Security

- JWT-based login
- Role-based authorization (admin, manager, guest)
- User registration with email verification
- Token validation on every request
- Password encryption using BCrypt
- Session management
- CORS configuration

## 📦 Project Structure

```
Project/
├── Frontend/
│   ├── admin/
│   ├── home/
│   ├── login/
│   └── manager/
└── Backend/
    ├── pom.xml
    ├── test1.1.db
    └── src/
        ├── main/
        │   ├── java/
        │   │   └── com/thanhvu/Premier/
        │   │       ├── config/
        │   │       ├── controller/
        │   │       ├── model/
        │   │       ├── repository/
        │   │       ├── service/
        │   │       └── security/
        │   └── resources/
        │       ├── templates/
        │       │   └── Mail.html
        │       └── application.properties
        └── test/
```

## 📬 Features in Progress

### Authentication & Security

- [ ] Password reset via email
- [ ] Refresh token implementation
- [ ] Two-factor authentication
- [ ] Account lockout after failed attempts

### User Management

- [ ] User profile management
- [ ] Profile picture upload
- [ ] User activity logs
- [ ] Session management improvements

### Match Management

- [ ] Live match updates
- [ ] Match commentary
- [ ] Player performance tracking
- [ ] Match highlights upload

### Statistics & Analytics

- [ ] Advanced statistics dashboard
- [ ] Player performance analytics
- [ ] Team performance trends
- [ ] Export statistics to PDF/Excel

### UI/UX Improvements

- [ ] Dark mode support
- [ ] Mobile app version
- [ ] Real-time notifications
- [ ] Interactive match timeline
- [ ] Enhanced search functionality
- [ ] Responsive design improvements

### System Features

- [ ] Automated backup system
- [ ] System health monitoring
- [ ] API rate limiting
- [ ] Caching implementation
- [ ] Performance optimizations

## 🛠 Setup and Installation

### Prerequisites

- Java JDK 17 or higher
- Maven 3.6 or higher
- SQLite 3
- Modern web browser

### Configuration

Create and place the file at the following location:

```
src/main/resources/application.properties
```

#### Application Name Configuration

```properties
spring.application.name=Premier
```

#### SQLite Database Configuration

```properties
spring.datasource.url=jdbc:sqlite:test1.1.db
spring.datasource.driver-class-name=org.sqlite.JDBC
```

#### JPA (Hibernate) Configuration

```properties
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
spring.jpa.hibernate.ddl-auto=update
```

#### CORS Configuration

```properties
URL_frontend = {your frontend url}
```

#### Email Configuration

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username= {your email}
spring.mail.password={your password}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

#### Signer key for jwt
```properties
jwt.signerKey={your key}
```

### Building and Running

1. Set up Java environment:

   - Watch tutorial: https://www.youtube.com/watch?v=SQykK40fFds

2. Open terminal in project root and run:

```bash
./mvnw clean install
./mvnw spring-boot:run
```

3. Verify successful startup:

```
INFO 15644 --- [Premier] [  restartedMain] com.thanhvu.Premier.PremierApplication   : Started PremierApplication in 4.232 seconds (process running for 4.513)
```

## 📚 API Documentation

For detailed API documentation, please refer to [APIDOCS.md](APIDOCS.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👥 Authors & Maintainer

- [Thanh Vu](https://github.com/ThaanhVuu) (Author & Maintainer)(Backend & Admin, Manager Frontend)

## 🙏 Acknowledgments

- All contributors and supporters
