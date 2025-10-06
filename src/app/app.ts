import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DynamicValidatorMessage } from './directives/dynamic-validator-message.directive';
import {
  alphabeticWithSpecialValidator,
  arabicAlphabeticValidator,
  arabicAlphabeticWithSpacesValidator,
  complexPasswordValidator,
  emailAddressValidator,
  fileValidator,
  ibanValidator,
  mobileNumberValidator,
  mobileOrPhoneNumberValidator,
  nationalIdValidator,
  numbersOnlyValidator,
  passwordMatchValidator,
  phoneNumberValidator,
  urlValidator
} from './validators/_index';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, DynamicValidatorMessage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      requiredField: ['', Validators.required],
      emailField: ['', [Validators.required, emailAddressValidator]],
      minLengthField: ['', [Validators.required, Validators.minLength(5)]],
      maxLengthField: ['', [Validators.required, Validators.maxLength(10)]],

      fileUpload: [null, fileValidator(['jpg', 'jpeg', 'png', 'pdf'], 5)],

      phoneNumber: ['', phoneNumberValidator],
      mobileNumber: ['', mobileNumberValidator],
      mobileOrPhoneNumber: ['', mobileOrPhoneNumberValidator],

      ibanField: ['', ibanValidator],

      password: ['', complexPasswordValidator],
      confirmPassword: ['', Validators.required],

      alphabeticWithSpecial: ['', alphabeticWithSpecialValidator],
      arabicAlphabetic: ['', arabicAlphabeticValidator],
      arabicAlphabeticWithSpaces: ['', arabicAlphabeticWithSpacesValidator],
      numbersOnly: ['', numbersOnlyValidator],

      nationalId: ['', nationalIdValidator],

      websiteUrl: ['', urlValidator]
    }, { validators: passwordMatchValidator });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form is valid:', this.form.value);
    } else {
      console.log('Form is invalid:', this.form.errors);
      this.form.markAllAsTouched();
    }
  }

  resetForm() {
    this.form.reset();
  }
}
