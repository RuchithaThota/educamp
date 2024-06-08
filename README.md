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
1. Clone the repository: `git clone https://github.com/yourusername/online-quiz-platform.git`
2. Navigate to the project directory: `cd online-quiz-platform`
3. Install dependencies:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
4. Configure environment variables:
   - Create a `.env` file in the `backend` directory and add the following:
     ```
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
   - Ensure to replace `your_mongodb_uri` with your MongoDB connection string and `your_jwt_secret` with a secret key for JWT.
5. Start the backend server: `cd backend && npm start`
6. Start the frontend development server: `cd frontend && npm start`

## Usage
1. Open your browser and navigate to `http://localhost:3000` to access the application.
2. Log in using your email and password or via Google OAuth.
3. Upon successful authentication, you will be redirected to your personalized dashboard.
4. Start an online quiz from the dashboard and enjoy the CAT experience!
5. Upon quiz submission, review the detailed performance report and suggestions for improvement.

## Documentation
The project includes detailed documentation to guide you through the installation process, usage, and codebase structure. Check the `docs` directory for more information.

## Contribution
Contributions are welcome! If you'd like to contribute to the project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
Special thanks to all contributors and open-source projects that made this platform possible.

