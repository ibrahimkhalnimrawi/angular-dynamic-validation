import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const arabicAlphabeticValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const arabicAlphabeticRegex = /^[\u0600-\u06FF]+$/;
  if (!arabicAlphabeticRegex.test(value)) {
    return { arabicAlphabetic: true };
  }
  return null;
};
