import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const alphabeticWithSpecialValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const alphabeticWithSpecialRegex = /^[a-zA-Z0-9\u0600-\u06FF\s.,()%\-\/\\]*$/;
  if (!alphabeticWithSpecialRegex.test(value)) {
    return { alphabeticWithSpecial: true };
  }
  return null;
};
