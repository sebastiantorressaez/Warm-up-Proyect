# Warm up Proyect

This is a practice project for ApplyDigital, focused on building a web application using NestJS, Next.js, and React. The app fetches article data from the Hacker News Algolia API, stores it in a MongoDB database, and then displays it on a web page in chronological order.

## Features

### Backend

Built with NestJS, the backend handles data management with MongoDB and exposes a REST API for the frontend. It also includes scheduled tasks to fetch and update articles automatically.

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
docker compose up --build
```

The backend and frontend will be available at:

Backend: `http://localhost:5000`

Frontend: `http://localhost:5001`
