# Online Quiz Platform

## Introduction
Welcome to our online quiz platform! This platform allows users to create, take, and manage quizzes on various topics. It's built using the MERN stack (MongoDB, Express.js, React, and Node.js) and offers features like user authentication, quiz creation, real-time scoring, and more.

## Features
- **User Authentication**: Users can sign up, log in, and log out securely.
- **Quiz Management**: Create, edit, delete quizzes with ease.
- **Quiz Taking**: Users can take quizzes and get instant feedback.
- **Real-time Scoring**: Scores are calculated instantly upon completion.
- **Responsive Design**: The platform is optimized for various devices.

## Installation
To run the application locally, follow these steps:

### Backend
1. Navigate to the `backend` directory:
    ```bash
    cd online-quiz-platform/backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and add the following environment variables:
    ```env
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    PORT=5000
    ```

### Frontend
1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## Running the Application
### Backend
To start the backend server, run:
```bash
npm start
