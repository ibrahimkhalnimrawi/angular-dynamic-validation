import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment } from '../../environments/environment';

export function fileValidator(
  allowedExtensions: string[] = environment.fileUploadAccept,
  maxFileSizeMB: number = environment.maxFileSizeMB
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    if (!file) return null;

    if (allowedExtensions && allowedExtensions.length > 0) {
      const fileName: string = file.name || '';
      const fileType: string = file.type || '';
      const isMimeAllowed = allowedExtensions.some(ext => ext.endsWith('/*') && fileType.startsWith(ext.replace('/*', '')));
      const isExtAllowed = allowedExtensions.some(ext => fileName.toLowerCase().endsWith(ext.toLowerCase()));
      if (!isMimeAllowed && !isExtAllowed) {
        return { invalidExtension: true };
      }
    }

    const maxSize = 1024 * 1024 * maxFileSizeMB;
    if (file.size > maxSize) {
      return { maxSize: { requiredSize: maxFileSizeMB, actualSize: (file.size / 1024 / 1024).toFixed(2) } };
    }

    return null;
  };
}
