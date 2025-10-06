import { ComponentRef, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewContainerRef, inject } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { EMPTY, Subscription, fromEvent, iif, merge, startWith } from 'rxjs';
import { OnTouchedStateMatcher } from '../services/state-matcher.service';
import { InputErrorComponent } from '../components/input-error.component';

@Directive({
  selector: `[formControlName]:not([withoutValidation])`
})
export class DynamicValidatorMessage implements OnInit, OnDestroy {
  @Input() stateMatcher!: OnTouchedStateMatcher;
  @Input() container!: ViewContainerRef;
  @Input() errorBorderClass: string = 'text-danger';
  @Input() errorBorderStyle: { [key: string]: string } = { borderColor: '#ef4444' };
  ngControl = inject(NgControl, { self: true, optional: true }) || inject(ControlContainer, { self: true });
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  get form() {
    return this.parentContainer?.formDirective as NgForm | FormGroupDirective | null;
  }
  private defaultErrorStateMatcher = inject(OnTouchedStateMatcher);
  private defaultContainer = inject(ViewContainerRef);

  private componentRef: ComponentRef<InputErrorComponent> | null = null;
  private errorMessageTrigger!: Subscription;
  private parentContainer = inject(ControlContainer, { optional: true });

  private addErrorBorder() {
    const element = this.elementRef.nativeElement;
    const inputElement = element.querySelector?.('input') || element.firstChild;

    if (inputElement) {
      this.renderer.addClass(inputElement, this.errorBorderClass);
      Object.entries(this.errorBorderStyle).forEach(([key, value]) => {
        this.renderer.setStyle(inputElement, key, value);
      });
    } else {
      const firstChild = element.firstChild;
      if (firstChild) {
      }
      this.renderer.addClass(element, this.errorBorderClass);
      Object.entries(this.errorBorderStyle).forEach(([key, value]) => {
        this.renderer.setStyle(element, key, value);
      });
    }
  }

  private removeErrorBorder() {
    const element = this.elementRef.nativeElement;
    const inputElement = element.querySelector?.('input') || element.firstChild;
    const target = inputElement || element;

    this.renderer.removeClass(target, this.errorBorderClass);
    Object.keys(this.errorBorderStyle).forEach(key => {
      this.renderer.removeStyle(target, key);
    });
  }

  ngOnInit() {
    queueMicrotask(() => {
      const matcher = this.stateMatcher ?? this.defaultErrorStateMatcher;
      const container = this.container ?? this.defaultContainer;
      if (!this.ngControl.control) throw Error(`No control model for ${this.ngControl.name} control...`);
      this.errorMessageTrigger = merge(
        this.ngControl.control.statusChanges,
        this.ngControl.control.valueChanges,
        fromEvent(this.elementRef.nativeElement, 'blur'),
        iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
      )
        .pipe(startWith(this.ngControl.control.status))
        .subscribe(() => {
          if (matcher.isErrorVisible(this.ngControl.control, this.form)) {
            // Do not mark as touched here, let the user interaction do it
            this.addErrorBorder();
            if (!this.componentRef) {
              this.componentRef = container.createComponent(InputErrorComponent);
              this.componentRef.changeDetectorRef.markForCheck();
            }
            this.componentRef.setInput('errors', this.ngControl.errors);
          } else {
            this.removeErrorBorder();
            this.componentRef?.destroy();
            this.componentRef = null;
          }
        });
    });
  }

  ngOnDestroy() {
    this.errorMessageTrigger.unsubscribe();
    this.removeErrorBorder();
  }
}
