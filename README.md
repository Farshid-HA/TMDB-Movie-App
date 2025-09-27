# TMDB Project

This project consists of a backend (ASP.NET Core) and a frontend (Angular) for interacting with TMDB (The Movie Database) API written by Farshid Hosni Azami. Both services are containerized and orchestrated using Docker Compose.

## Prerequisites
- [Docker](https://www.docker.com/get-started) installed on your machine.

## Running the Project with Docker

1. In the backend folder, in the appsettings.json, replcae the stars with real API key. 
2. Open a terminal in the root directory of the project (where `docker-compose.yml` is located).
3. Run the following command:

```sh
docker-compose up -d --build
```

This command will build and start both the backend and frontend containers.

- The **backend** will be available at: `http://localhost:5000`
- The **frontend** will be available at: `http://localhost:4200`

## Stopping the Project
To stop the containers, press `Ctrl+C` in the terminal, then run:

```sh
docker-compose down
```

---

For more details, see the `backend/` and `frontend/` folders.
