import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const phoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const phoneRegex = /^01\d{8}$/;
  if (!phoneRegex.test(value)) {
    return { phoneNumber: true };
  }
  return null;
};
