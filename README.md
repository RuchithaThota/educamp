# Online Quiz Platform with CAT Experience, Google OAuth Login, and Personalized Dashboard

## Introduction
Welcome to our Online Quiz Platform! This platform aims to provide users with an interactive and personalized quiz-taking experience. It features user authentication with Google OAuth login, a personalized dashboard, and a quiz system based on Computerized Adaptive Testing (CAT) principles.

## Features
- **User Authentication**: Users can log in using their email and password or via Google OAuth for a seamless login experience. New users can sign up for an account.
- **Personalized Dashboard**: Upon successful authentication, users are directed to a personalized dashboard where they can start an online quiz.
- **Quiz System with CAT Experience**: The quiz system consists of 20 multiple-choice questions (MCQ) with varying initial weightages based on difficulty. CAT is implemented to adapt the quiz difficulty based on the user's performance.
- **Result Evaluation and Reporting**: Upon quiz submission, a detailed report is generated, evaluating the user's performance and providing suggestions for further improvement.
- **Technologies Used**: The project is built using the MERN stack, including MongoDB, Express.js, React, and Node.js.

## Installation
To set up the project locally, follow these steps:
1. Clone the repository: `git clone https://github.com/RuchithaThota/educamp.git`
2. Navigate to the project directory: `cd educamp`
3. Install dependencies:
   - Backend: `npm install`
   - Frontend: `cd frontend && npm install`

## Configuration Variables

Before running the application, you need to set up the following environment variables:
   - Create a `.env` file in the `root` directory and add the following:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email
     EMAIL_PASSWORD=your_google_app_password
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ```
   - Ensure to replace `your_mongodb_uri` with your MongoDB connection string and `your_jwt_secret` with a secret key for JWT.

- **EMAIL_USER**: If your application sends emails (e.g., for password reset), you'll need an email account to send them from. Provide the email address for this account.

- **EMAIL_PASSWORD**: This is the app-specific password generated for your email account. To generate an app-specific password:
  1. Enable Two-Factor Authentication (2FA) on your email account.
  2. Access your email account's security settings.
  3. Look for an option to generate app-specific passwords (often found in the "Security" or "App Passwords" section).
  4. Create a new app password and specify "Nodemailer" or a relevant identifier.
  5. Copy the generated password and use it as the `EMAIL_PASSWORD` environment variable.

- **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: To enable Google OAuth for user authentication, you need to set up a project in the Google Developers Console and obtain OAuth 2.0 credentials. Here's how:
  1. Go to the [Google Developers Console](https://console.developers.google.com/).
  2. Create a new project or select an existing one.
  3. Navigate to the "Credentials" tab.
  4. Click on "Create credentials" and select "OAuth client ID".
  5. Choose "Web application" as the application type.
  6. Add `http://localhost:5000/auth/google/callback` as an authorized redirect URI (replace `5000` with your actual port if it's different).
  7. Click "Create" and copy the generated client ID and client secret. Use these values as the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables respectively.

5. Start the backend server: `npm run dev`
6. Start the frontend development server: `cd frontend && npm run dev`

## Usage
1. Open your browser and navigate to `http://localhost:5173` to access the application.
2. Log in using your email and password or via Google OAuth.
3. Upon successful authentication, you will be redirected to your personalized dashboard.
4. Start an online quiz from the dashboard and enjoy the CAT experience!
5. Upon quiz submission, review the detailed performance report and suggestions for improvement.


