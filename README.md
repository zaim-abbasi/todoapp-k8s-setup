
# MERN Todo App

A simple Todo application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- Create new todos
- Toggle todo completion status
- Delete todos
- Responsive design

## Technologies Used

- **MongoDB**: Database
- **Express.js**: Backend framework
- **React**: Frontend library
- **Node.js**: Runtime environment
- **Tailwind CSS**: Styling
- **Docker**: Containerization

## Project Structure

```
mern-todo-app/
├── backend/               # Backend code (Node.js/Express)
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Express server setup
│   ├── Dockerfile         # Backend Docker configuration
│   └── package.json       # Backend dependencies
│
├── src/                   # Frontend code (React)
│   ├── api/               # API service functions
│   ├── components/        # React components
│   ├── pages/             # Page components
│   └── ...                # Other React files
│
├── Dockerfile             # Frontend Docker configuration
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # Project documentation
```

## Running Locally

### Prerequisites

- Node.js (v14+)
- MongoDB (v4+)
- npm or yarn

### Option 1: Without Docker

#### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file (use `.env.example` as template):
   ```
   cp .env.example .env
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

Backend will run on http://localhost:5000

#### Frontend Setup

1. From the project root, install dependencies:
   ```
   npm install
   ```

2. Start the frontend development server:
   ```
   npm run dev
   ```

Frontend will run on http://localhost:8080

### Option 2: With Docker

1. Make sure Docker and Docker Compose are installed on your machine

2. Build and start the containers:
   ```
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Environment Variables

### Backend

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/MernAppSCD
```

When using Docker Compose, the `MONGODB_URI` is automatically set to point to the MongoDB container.

## API Endpoints

- `GET /todos`: Get all todos
- `POST /todos`: Create a new todo
- `PUT /todos/:id`: Update a todo by ID
- `DELETE /todos/:id`: Delete a todo by ID
