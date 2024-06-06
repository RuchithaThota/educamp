export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NUM_REGEX = /^\d*$/;
export const SPACE_BETWEEN_REGEX = /\S\s+\S/;

export type ErrorType = {
  name?: string;
  isNameInvalid?: boolean;
  email?: string;
  isEmailInvalid?: boolean;
  isPasswordInvalid?: boolean;
  password?: string;
  otp?: string;
  isOtpInvalid?: boolean;
};

export const validate = (vals: { [key: string]: string }): ErrorType => {
  const errors: ErrorType = {};
  if (vals.name?.trim() === "") {
    errors.name = "Name is required";
    errors.isNameInvalid = true;
  }
  if (!EMAIL_REGEX.test(vals.email?.trim())) {
    errors.email = "Invalid Email";
    errors.isEmailInvalid = true;
  }
  if (vals.password?.trim().length < 5) {
    errors.password = "password must be atleast 5 characters";
    errors.isPasswordInvalid = true;
  } else if (SPACE_BETWEEN_REGEX.test(vals.password)) {
    errors.password = "password can't contain space";
    errors.isPasswordInvalid = true;
  }
  if (
    vals.otp?.trim() == "" ||
    vals.otp?.trim().length !== 6 ||
    !NUM_REGEX.test(vals.otp.trim())
  ) {
    errors.otp = "otp must be 6 digits";
    errors.isOtpInvalid = true;
  }
  return errors;
};
