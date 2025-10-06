import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const nationalIdValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  if (!validateNationalId(value)) {
    return { nationalId: true };
  }
  return null;
};

const validateNationalId = (id: string): boolean => {
  if (!id || id.length !== 10) return false;

  // Check if all characters are digits
  if (!/^\d+$/.test(id)) return false;

  // First digit must be '1'
  if (id[0] !== '1') return false;

  let sum = 0;
  for (let i = 0; i < id.length - 1; i++) {
    let digit = parseInt(id[i]);
    if (i % 2 === 0) {
      digit *= 2;
    }

    sum += Math.floor(digit / 10) + (digit % 10);
  }

  let checksum = 10 - (sum % 10);
  if (checksum === 10) {
    checksum = 0;
  }

  return checksum === parseInt(id[id.length - 1]);
};
