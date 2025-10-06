import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[MessageContainer]'
})
export class MessageContainer {
  container = inject(ViewContainerRef);
}
