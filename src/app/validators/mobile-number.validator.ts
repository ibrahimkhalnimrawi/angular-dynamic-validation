import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const mobileNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const mobileRegex = /^05\d{8}$/;
  if (!mobileRegex.test(value)) {
    return { mobileNumber: true };
  }
  return null;
};
