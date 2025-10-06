import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const mobileOrPhoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const mobileRegex = /^05\d{8}$/;
  const phoneRegex = /^01\d{8}$/;
  if (!mobileRegex.test(value) && !phoneRegex.test(value)) {
    return { mobileOrPhoneNumber: true };
  }
  return null;
};
