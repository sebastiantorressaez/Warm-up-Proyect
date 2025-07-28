# Warm up Proyect

This is a practice project for ApplyDigital, focused on building a web application using NestJS, Next.js, and React. The app fetches article data from the Hacker News Algolia API, stores it in a MongoDB database, and then displays it on a web page in chronological order.

## Features

### Backend
#### Endpoints

- `GET /articles`: Retrieves all articles stored in the database.
- `GET /articles/:objectID`: Retrieves a specific article by its objectID.
- `POST /articles`: Create a new article with the provided data.
- `DELETE /articles/:objectID`: Marks an article as deleted by updating its status.

### Frontend

The page consists of a header and, below it, a chronologically ordered list of articles fetched from the REST API. Each article displays its relevant information along with a delete button that allows the user to remove the article.

## Requirements

- Docker
- Docker Compose

## How to run the application

```bash
git clone https://github.com/sebastiantorressaez/Warm-up-Proyect.git
cd Warm-up-Proyect
```

```bash
docker network create shared_net # Create this network only if it does not exist
docker compose up --build
```

The backend and frontend will be available at:

Backend: `http://localhost:5000`

Frontend: `http://localhost:5001`

## How to run the test

```bash
cd backend

# run the unit test for articles
npm run test

# run the end to end test for articles
npm run test:e2e
```