import { ControlValueAccessor } from '@angular/forms';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: 'input[type=file][observeFiles]',
  host: {
    '(blur)': 'onTouchedCallback()',
    '(change)': 'handleChange( $event.target.files )'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputValueAccessorDirective,
      multi: true
    }
  ]
})
export class FileInputValueAccessorDirective implements ControlValueAccessor {
  private elementRef: ElementRef;
  private onChangeCallback: Function;
  private onTouchedCallback: Function;

  constructor(elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
    this.elementRef = elementRef;
    this.onChangeCallback = () => { };
    this.onTouchedCallback = () => { };
  }

  public handleChange(files: FileList): void {
    if (this.elementRef.nativeElement.multiple) {
      this.onChangeCallback(Array.from(files));
    }
    else {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.onChangeCallback(files.length ? reader.result.toString().split(',')[1] : null);
        this.changeDetectorRef.markForCheck();
      };
    }
  }

  public registerOnChange(callback: Function): void {
    this.onChangeCallback = callback;
  }

  public registerOnTouched(callback: Function): void {
    this.onTouchedCallback = callback;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  public writeValue(value: any): void {
    if (value instanceof FileList) {
      this.elementRef.nativeElement.files = value;
    }
    else if (Array.isArray(value) && !value.length) {
      this.elementRef.nativeElement.files = null;
    }
    else if (value === null) {
      this.elementRef.nativeElement.files = null;
    }
    else {
      if (console && console.warn && console.log) {
        console.log('Ignoring attempt to assign non-FileList to input[type=file].');
        console.log('Value:', value);
      }
    }
  }
}
