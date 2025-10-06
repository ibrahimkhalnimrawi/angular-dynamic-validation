import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const numbersOnlyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const numbersOnlyRegex = /^\d+$/;
  if (!numbersOnlyRegex.test(value)) {
    return { numbersOnly: true };
  }
  return null;
};
