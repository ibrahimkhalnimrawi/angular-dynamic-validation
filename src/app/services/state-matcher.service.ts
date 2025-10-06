import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

export interface StateMatcher {
  isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StateMatcher implements StateMatcher {
  isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | NgForm | null) {
    return Boolean(control && control.invalid && (control.dirty || (form && form.submitted)));
  }
}

@Injectable({
  providedIn: 'root',
})
export class OnTouchedStateMatcher implements StateMatcher {
  isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | NgForm | null) {
    return Boolean(control && control.invalid && (control.touched || (form && form.submitted)));
  }
}
