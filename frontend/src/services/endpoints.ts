import { quiz_id } from "../env-variables";

export const SIGNUP_URL = "/auth/signup";

export const LOGIN_URL = "/auth/login";

export const FORGOT_PASSWORD_URL = "/auth/forgot-password";

export const VERIFY_RESET_PASSWORD_OTP_URL = "/auth/verify/reset-password/otp";

export const RESET_PASSWORD_URL = "/auth/reset-password";

export const USER_PROFILE_URL = "/api/user/profile";

export const QUIZ_URL = `/api/quiz/${quiz_id}`;

export const QUIZ_START_URL = `/api/quiz/${quiz_id}/start`;

export const QUIZ_SUBMIT_URL = `/api/quiz/${quiz_id}/submit`;

export const QUIZ_RESULT_URL = `/api/quiz/${quiz_id}/result`;

export const ALL_QUESTIONS_URL = "/api/question/all";

export const USER_ANSWER_URL = "/api/question/user-answer";

export const ALL_USER_ANSWER_URL = "/api/question/user-answer/all";
