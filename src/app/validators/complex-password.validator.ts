import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const complexPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  // Requires: at least 1 uppercase, 1 lowercase, 1 digit, 1 special character, minimum 8 characters
  const complexPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]).{8,}$/;
  if (!complexPasswordRegex.test(value)) {
    return { complexPassword: true };
  }
  return null;
};
