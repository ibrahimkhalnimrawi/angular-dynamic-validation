import { InjectionToken } from '@angular/core';

export const ERROR_MESSAGES: { [key: string]: (args?: any) => string } = {
  required: () => `This field is required`,
  email: () => `Please enter a valid email address`,
  minlength: ({ requiredLength }) => `This field must be at least ${requiredLength} characters`,
  maxlength: ({ requiredLength }) => `This field must be at most ${requiredLength} characters`,
  invalidExtension: () => `Unsupported file type`,
  maxSize: ({ requiredSize, actualSize }) => `File must be smaller than ${requiredSize} MB, but is ${actualSize} MB`,
  phoneNumber: () => `Phone number must be 10 digits and start with 01`,
  mobileNumber: () => `Mobile number must be 10 digits and start with 05`,
  mobileOrPhoneNumber: () => `Number must be 10 digits and start with 01 or 05`,
  iban: () => `Invalid IBAN format - must be 24 characters and start with SA`,
  passwordMismatch: () => `Passwords do not match`,
  alphabeticWithSpecial: () => `This field may only contain letters, numbers, and allowed symbols`,
  arabicAlphabetic: () => `This field may only contain Arabic letters`,
  arabicAlphabeticWithSpaces: () => `This field may only contain Arabic letters and spaces`,
  emailAddress: () => `Please enter a valid email address`,
  nationalId: () => `Invalid national ID - must be 10 digits and start with 1`,
  numbersOnly: () => `This field may only contain numbers`,
  complexPassword: () => `Password must be at least 8 characters and include uppercase, lowercase, number, and special character`,
  url: () => `Please enter a valid URL (http or https)`,
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(`Validation Messages`, {
  providedIn: 'root',
  factory: () => ERROR_MESSAGES,
});
