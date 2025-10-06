import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ibanValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }
  if (!isValidIban(value)) {
    return { iban: true };
  }
  return null;
};

const isValidIban = (iban: string): boolean => {
  iban = iban.replace(/\s/g, '');
  if (!iban.toLowerCase().startsWith('sa')) return false;
  if (iban.length < 4) return false;
  if (iban[0] === ' ') return false;
  if (iban[1] === ' ') return false;
  if (iban[2] === ' ') return false;
  if (iban[3] === ' ') return false;

  let checksum = 0;
  const ibanLength = iban.length;
  for (let charIndex = 0; charIndex < ibanLength; charIndex++) {
    const c = iban[(charIndex + 4) % ibanLength];
    if (c === ' ') continue;

    let value: number;
    if (c >= '0' && c <= '9') {
      value = c.charCodeAt(0) - '0'.charCodeAt(0);
    } else if (c >= 'A' && c <= 'Z') {
      value = c.charCodeAt(0) - 'A'.charCodeAt(0);
      checksum = (checksum * 10 + Math.floor(value / 10) + 1) % 97;
      value %= 10;
    } else if (c >= 'a' && c <= 'z') {
      value = c.charCodeAt(0) - 'a'.charCodeAt(0);
      checksum = (checksum * 10 + Math.floor(value / 10) + 1) % 97;
      value %= 10;
    } else {
      return false;
    }

    checksum = (checksum * 10 + value) % 97;
  }
  return checksum === 1;
};
