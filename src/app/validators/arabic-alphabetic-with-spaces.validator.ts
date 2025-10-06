import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const arabicAlphabeticWithSpacesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const arabicAlphabeticWithSpacesRegex = /^[\u0600-\u06FF\s]+$/;
  if (!arabicAlphabeticWithSpacesRegex.test(value)) {
    return { arabicAlphabeticWithSpaces: true };
  }
  return null;
};
