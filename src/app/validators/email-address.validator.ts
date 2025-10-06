import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailAddressValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const emailRegex = /^[a-zA-Z0-9]+([\._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
  if (!emailRegex.test(value)) {
    return { emailAddress: true };
  }
  return null;
};
