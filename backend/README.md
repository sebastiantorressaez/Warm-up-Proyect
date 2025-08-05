# Warm up Project Backend

This is the backend of the Warm up Project, it is built using **NestJS** and **TypeScript**, and it handles data ingestion, storage, and exposure through a REST API.

The backend fetches articles from the Hacker News Algolia API, filters and validates the data, and stores it in a **MongoDB** database. It also exposes endpoints to retrieve, delete, or manage articles. Data import is scheduled automatically every hour.

#### Endpoints

- `GET /articles`: Retrieves all articles stored in the database.
- `GET /articles/:objectID`: Retrieves a specific article by its objectID.
- `POST /articles`: Create a new article with the provided data.
- `DELETE /articles/:objectID`: Marks an article as deleted by updating its status.

## How to run the tests

```bash
# run the unit test for articles
npm run test

# run the end to end test for articles
npm run test:e2e

# Run tests with coverage report
npm run test:cov
```
