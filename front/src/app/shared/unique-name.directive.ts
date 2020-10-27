import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[unique]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UniqueNameDirective,
    multi: true
  }]
})
export class UniqueNameDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return control.value?.toLowerCase() !== 'wavezone'
      ? null
      : { used: control.value };
  }
}
