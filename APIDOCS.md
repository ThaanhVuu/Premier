# Premier League Management System API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "fullName": "string"
}
```

**Response:**
```json
{
    "id": "string",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "role": "string"
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
    "username": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "token": "string",
    "refreshToken": "string",
    "type": "Bearer"
}
```

### Logout
```http
POST /auth/logout
```

**Headers:**
```
Authorization: Bearer {token}
```

## Teams

### Get All Teams
```http
GET /teams
```

**Response:**
```json
[
    {
        "id": "string",
        "name": "string",
        "shortName": "string",
        "logo": "string",
        "stadium": {
            "id": "string",
            "name": "string"
        },
        "manager": "string",
        "foundedYear": "number"
    }
]
```

### Get Team by ID
```http
GET /teams/{id}
```

**Response:**
```json
{
    "id": "string",
    "name": "string",
    "shortName": "string",
    "logo": "string",
    "stadium": {
        "id": "string",
        "name": "string",
        "capacity": "number",
        "location": "string"
    },
    "manager": "string",
    "foundedYear": "number",
    "players": [
        {
            "id": "string",
            "name": "string",
            "position": "string",
            "number": "number"
        }
    ]
}
```

### Create Team
```http
POST /teams
```

**Request Body:**
```json
{
    "name": "string",
    "shortName": "string",
    "logo": "string",
    "stadiumId": "string",
    "manager": "string",
    "foundedYear": "number"
}
```

### Update Team
```http
PUT /teams/{id}
```

**Request Body:**
```json
{
    "name": "string",
    "shortName": "string",
    "logo": "string",
    "stadiumId": "string",
    "manager": "string",
    "foundedYear": "number"
}
```

### Delete Team
```http
DELETE /teams/{id}
```

## Matches

### Get All Matches
```http
GET /matches
```

**Response:**
```json
[
    {
        "id": "string",
        "homeTeam": {
            "id": "string",
            "name": "string"
        },
        "awayTeam": {
            "id": "string",
            "name": "string"
        },
        "stadium": {
            "id": "string",
            "name": "string"
        },
        "date": "string",
        "time": "string",
        "status": "string",
        "score": {
            "homeScore": "number",
            "awayScore": "number"
        }
    }
]
```

### Get Match by ID
```http
GET /matches/{id}
```

**Response:**
```json
{
    "id": "string",
    "homeTeam": {
        "id": "string",
        "name": "string"
    },
    "awayTeam": {
        "id": "string",
        "name": "string"
    },
    "stadium": {
        "id": "string",
        "name": "string"
    },
    "date": "string",
    "time": "string",
    "status": "string",
    "score": {
        "homeScore": "number",
        "awayScore": "number"
    },
    "events": [
        {
            "id": "string",
            "type": "string",
            "player": {
                "id": "string",
                "name": "string"
            },
            "team": {
                "id": "string",
                "name": "string"
            },
            "time": "string",
            "description": "string"
        }
    ]
}
```

### Create Match
```http
POST /matches
```

**Request Body:**
```json
{
    "homeTeamId": "string",
    "awayTeamId": "string",
    "stadiumId": "string",
    "date": "string",
    "time": "string"
}
```

### Update Match
```http
PUT /matches/{id}
```

**Request Body:**
```json
{
    "homeTeamId": "string",
    "awayTeamId": "string",
    "stadiumId": "string",
    "date": "string",
    "time": "string",
    "status": "string",
    "score": {
        "homeScore": "number",
        "awayScore": "number"
    }
}
```

### Delete Match
```http
DELETE /matches/{id}
```

## Players

### Get All Players
```http
GET /players
```

**Response:**
```json
[
    {
        "id": "string",
        "name": "string",
        "position": "string",
        "number": "number",
        "team": {
            "id": "string",
            "name": "string"
        },
        "nationality": "string",
        "dateOfBirth": "string"
    }
]
```

### Get Player by ID
```http
GET /players/{id}
```

**Response:**
```json
{
    "id": "string",
    "name": "string",
    "position": "string",
    "number": "number",
    "team": {
        "id": "string",
        "name": "string"
    },
    "nationality": "string",
    "dateOfBirth": "string",
    "height": "number",
    "weight": "number",
    "statistics": {
        "goals": "number",
        "assists": "number",
        "yellowCards": "number",
        "redCards": "number"
    }
}
```

### Create Player
```http
POST /players
```

**Request Body:**
```json
{
    "name": "string",
    "position": "string",
    "number": "number",
    "teamId": "string",
    "nationality": "string",
    "dateOfBirth": "string",
    "height": "number",
    "weight": "number"
}
```

### Update Player
```http
PUT /players/{id}
```

**Request Body:**
```json
{
    "name": "string",
    "position": "string",
    "number": "number",
    "teamId": "string",
    "nationality": "string",
    "dateOfBirth": "string",
    "height": "number",
    "weight": "number"
}
```

### Delete Player
```http
DELETE /players/{id}
```

## Stadiums

### Get All Stadiums
```http
GET /stadiums
```

**Response:**
```json
[
    {
        "id": "string",
        "name": "string",
        "capacity": "number",
        "location": "string",
        "team": {
            "id": "string",
            "name": "string"
        }
    }
]
```

### Get Stadium by ID
```http
GET /stadiums/{id}
```

**Response:**
```json
{
    "id": "string",
    "name": "string",
    "capacity": "number",
    "location": "string",
    "team": {
        "id": "string",
        "name": "string"
    },
    "description": "string",
    "facilities": ["string"]
}
```

### Create Stadium
```http
POST /stadiums
```

**Request Body:**
```json
{
    "name": "string",
    "capacity": "number",
    "location": "string",
    "teamId": "string",
    "description": "string",
    "facilities": ["string"]
}
```

### Update Stadium
```http
PUT /stadiums/{id}
```

**Request Body:**
```json
{
    "name": "string",
    "capacity": "number",
    "location": "string",
    "teamId": "string",
    "description": "string",
    "facilities": ["string"]
}
```

### Delete Stadium
```http
DELETE /stadiums/{id}
```

## News

### Get All News
```http
GET /news
```

**Response:**
```json
[
    {
        "id": "string",
        "title": "string",
        "content": "string",
        "image": "string",
        "author": "string",
        "publishDate": "string",
        "category": "string"
    }
]
```

### Get News by ID
```http
GET /news/{id}
```

**Response:**
```json
{
    "id": "string",
    "title": "string",
    "content": "string",
    "image": "string",
    "author": "string",
    "publishDate": "string",
    "category": "string",
    "tags": ["string"],
    "relatedTeams": [
        {
            "id": "string",
            "name": "string"
        }
    ]
}
```

### Create News
```http
POST /news
```

**Request Body:**
```json
{
    "title": "string",
    "content": "string",
    "image": "string",
    "category": "string",
    "tags": ["string"],
    "relatedTeamIds": ["string"]
}
```

### Update News
```http
PUT /news/{id}
```

**Request Body:**
```json
{
    "title": "string",
    "content": "string",
    "image": "string",
    "category": "string",
    "tags": ["string"],
    "relatedTeamIds": ["string"]
}
```

### Delete News
```http
DELETE /news/{id}
```

## Statistics

### Get Team Statistics
```http
GET /statistics/teams/{teamId}
```

**Response:**
```json
{
    "team": {
        "id": "string",
        "name": "string"
    },
    "matchesPlayed": "number",
    "wins": "number",
    "draws": "number",
    "losses": "number",
    "goalsFor": "number",
    "goalsAgainst": "number",
    "points": "number",
    "position": "number"
}
```

### Get Player Statistics
```http
GET /statistics/players/{playerId}
```

**Response:**
```json
{
    "player": {
        "id": "string",
        "name": "string",
        "team": {
            "id": "string",
            "name": "string"
        }
    },
    "matchesPlayed": "number",
    "goals": "number",
    "assists": "number",
    "yellowCards": "number",
    "redCards": "number",
    "minutesPlayed": "number"
}
```

**Response:**
```json
{
    "totalMatches": "number",
    "totalGoals": "number",
    "averageGoalsPerMatch": "number",
    "topScorer": {
        "player": {
            "id": "string",
            "name": "string"
        },
        "goals": "number"
    },
    "topAssists": {
        "player": {
            "id": "string",
            "name": "string"
        },
        "assists": "number"
    },
    "leagueTable": [
        {
            "team": {
                "id": "string",
                "name": "string"
            },
            "points": "number",
            "position": "number"
        }
    ]
}
```

## Response Codes

| Code | HTTP Status               | Description                                   |
| ---- | ------------------------- | --------------------------------------------- |
| 1001 | 400 Bad Request           | Error message key not found                   |
| 1002 | 500 Internal Server Error | Unexpected error occurred                     |
| 1003 | 400 Bad Request           | This field must not be empty                  |
| 1004 | 409 Conflict              | Entity already exists and must be unique      |
| 1005 | 401 Unauthorized          | Invalid login credentials                     |
| 1006 | 404 Not Found             | Entity not found                              |
| 1007 | 401 Unauthorized          | Invalid token                                 |
| 1008 | 401 Unauthorized          | Authentication is required                    |
| 1009 | 403 Forbidden             | You are not authorized to perform this action |

## Notes

- All requests (except get) requiring authentication must include the Bearer token in the Authorization header
- Date formats should be in ISO 8601 format (YYYY-MM-DD)
- DateTime formats should be in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
- All IDs in the API are UUID strings
- Rate limiting: 100 requests per minute for authenticated users, 20 requests per minute for unauthenticated users
- API version: v1
- Base URL: http://localhost:8080/api

## Support

For API support or questions, please contact:
- Email: Thanhvu7623@gmail.com
- GitHub: [https://github.com/ThaanhVuu/Premier](https://github.com/ThaanhVuu/Premier)