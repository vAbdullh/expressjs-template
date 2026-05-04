# Express.js API Template

A production-ready Express.js REST API template with a clean project structure.

## Project Structure

```
├── Dockerfile
├── .dockerignore
├── .env.example
├── .env.dev
└── src/
    ├── app.js                 # Entry point — env checks, server start
    ├── configs/
    │   ├── db.js              # Database connection (fake placeholder)
    │   └── swagger.js         # Swagger/OpenAPI configuration
    ├── controllers/
    │   ├── healthController.js
    │   └── userController.js
    ├── middlewares/
    │   └── apiKeyAuth.js      # Static API key validation
    ├── models/
    │   └── userModel.js       # In-memory user model
    └── routes/
        ├── healthRoutes.js
        └── userRoutes.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env.dev
```

### 3. Run the server

```bash
# Development (with hot-reload)
npm run dev

# Production
npm start
```

### Docker

```bash
docker build -t expressjs-api .
docker run -p 3000:3000 --env-file .env.dev expressjs-api
```

## API Endpoints

All endpoints are prefixed with `/v1/api`.

| Method   | Endpoint            | Auth | Description        |
| -------- | ------------------- | ---- | ------------------ |
| `GET`    | `/v1/api/health`    | No   | Health check       |
| `GET`    | `/v1/api/docs`      | No   | Swagger UI         |
| `GET`    | `/v1/api/users`     | Yes  | Get all users      |
| `GET`    | `/v1/api/users/:id` | Yes  | Get user by ID     |
| `POST`   | `/v1/api/users`     | Yes  | Create a new user  |
| `PUT`    | `/v1/api/users/:id` | Yes  | Update a user      |
| `DELETE` | `/v1/api/users/:id` | Yes  | Delete a user      |

## Authentication

Protected endpoints require a static API key via the `x-api-key` header:

```bash
curl http://localhost:3000/v1/api/users \
  -H "x-api-key: your-api-key-here"
```

## License

MIT