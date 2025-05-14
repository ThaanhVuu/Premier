# 🚀 API Documentation

## 📋 Table of Contents

- [Authentication](#authentication)
- [Stadiums](#stadiums)
- [Clubs](#clubs)
- [Players](#players)
- [Matches](#matches)
- [News](#news)
- [Users](#users)

## 🔐 Authentication

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "string",
    "password": "string"
}
```

**Response**

```json
{
  "token": "string"
}
```

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

## 🏟 Stadiums

### Get All Stadiums

```http
GET /api/stadiums
Authorization: Bearer {token}
```

### Get Stadium by ID

```http
GET /api/stadiums/{id}
Authorization: Bearer {token}
```

### Create Stadium (Manager only)

```http
POST /api/stadiums
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "string",
    "capacity": "number",
    "location": "string",
    "description": "string"
}
```

### Update Stadium (Manager only)

```http
PUT /api/stadiums/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "string",
    "capacity": "number",
    "location": "string",
    "description": "string"
}
```

### Delete Stadium (Manager only)

```http
DELETE /api/stadiums/{id}
Authorization: Bearer {token}
```

## ⚽ Clubs

### Get All Clubs

```http
GET /api/clubs
Authorization: Bearer {token}
```

### Get Club by ID

```http
GET /api/clubs/{id}
Authorization: Bearer {token}
```

### Create Club (Manager only)

```http
POST /api/clubs
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "string",
    "stadium": "number",
    "foundedYear": "number",
    "description": "string"
}
```

### Update Club (Manager only)

```http
PUT /api/clubs/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "string",
    "stadium": "number",
    "foundedYear": "number",
    "description": "string"
}
```

### Delete Club (Manager only)

```http
DELETE /api/clubs/{id}
Authorization: Bearer {token}
```

## 👥 Players

### Get All Players

```http
GET /api/players
Authorization: Bearer {token}
```

### Get Player by ID

```http
GET /api/players/{id}
Authorization: Bearer {token}
```

### Create Player (Manager only)

```http
POST /api/players
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "string",
    "club": "number",
    "position": "string",
    "number": "number",
    "nationality": "string",
    "birthDate": "date"
}
```

### Update Player (Manager only)

```http
PUT /api/players/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "string",
    "club": "number",
    "position": "string",
    "number": "number",
    "nationality": "string",
    "birthDate": "date"
}
```

### Delete Player (Manager only)

```http
DELETE /api/players/{id}
Authorization: Bearer {token}
```

## 🏆 Matches

### Get All Matches

```http
GET /api/matches
Authorization: Bearer {token}
```

### Get Match by ID

```http
GET /api/matches/{id}
Authorization: Bearer {token}
```

### Create Match (Manager only)

```http
POST /api/matches
Authorization: Bearer {token}
Content-Type: application/json

{
    "homeClub": "number",
    "awayClub": "number",
    "stadium": "number",
    "date": "datetime",
    "status": "string"
}
```

### Update Match (Manager only)

```http
PUT /api/matches/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "homeClub": "number",
    "awayClub": "number",
    "stadium": "number",
    "date": "datetime",
    "status": "string"
}
```

### Delete Match (Manager only)

```http
DELETE /api/matches/{id}
Authorization: Bearer {token}
```

### Add Match Result (Manager only)

```http
POST /api/matches/{id}/result
Authorization: Bearer {token}
Content-Type: application/json

{
    "homeScore": "number",
    "awayScore": "number",
    "scorers": [
        {
            "player": "number",
            "minute": "number",
            "isOwnGoal": "boolean"
        }
    ]
}
```

## 📰 News

### Get All News

```http
GET /api/news
Authorization: Bearer {token}
```

### Get News by ID

```http
GET /api/news/{id}
Authorization: Bearer {token}
```

### Create News (Manager only)

```http
POST /api/news
Authorization: Bearer {token}
Content-Type: application/json

{
    "title": "string",
    "content": "string",
    "imageUrl": "string",
    "category": "string"
}
```

### Update News (Manager only)

```http
PUT /api/news/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "title": "string",
    "content": "string",
    "imageUrl": "string",
    "category": "string"
}
```

### Delete News (Manager only)

```http
DELETE /api/news/{id}
Authorization: Bearer {token}
```

## 👤 Users

### Get All Users (Admin only)

```http
GET /api/users
Authorization: Bearer {token}
```

### Get User by ID (Admin only)

```http
GET /api/users/{id}
Authorization: Bearer {token}
```

### Update User Role (Admin only)

```http
PUT /api/users/{id}/role
Authorization: Bearer {token}
Content-Type: application/json

{
    "role": "string"
}
```

### Delete User (Admin only)

```http
DELETE /api/users/{id}
Authorization: Bearer {token}
```

## 📊 Statistics

### Get Club Statistics

```http
GET /api/statistics/clubs/{clubId}
Authorization: Bearer {token}
```

### Get Player Statistics

```http
GET /api/statistics/players/{playerId}
Authorization: Bearer {token}
```

### Get Global Statistics (Admin only)

```http
GET /api/statistics/global
Authorization: Bearer {token}
```

## 🔄 Response Codes

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

## 📝 Notes

- All requests requiring authentication must include the Bearer token in the Authorization header
- Date formats should be in ISO 8601 format (YYYY-MM-DD)
- DateTime formats should be in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
- All IDs in the API are numeric
