import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MessagePipe } from '../pipes/message.pipe';

@Component({
  selector: 'app-input-error',
  imports: [KeyValuePipe, MessagePipe],
  template: `@for (error of errors() | keyvalue; track error.key) {
    <div class="text-danger">
      {{ error.key | message : error.value }}
    </div>
    } `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class InputErrorComponent {
  errors = input<ValidationErrors | undefined | null>(null);
}
