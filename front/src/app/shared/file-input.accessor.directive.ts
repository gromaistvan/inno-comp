import { Directive, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[type=file][appObserveFiles]',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: FileInputValueAccessorDirective, multi: true }]
})
export class FileInputValueAccessorDirective implements ControlValueAccessor {
  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  @HostListener('blur')
  onTouchedCallback() {
  }

  @HostListener('change', ['$event.target.files'])
  handleChange(files: FileList): void {
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

  onChangeCallback(files: File[] | string | null) {
  }

  writeValue(value: any): void {
    if (value instanceof FileList) {
      this.elementRef.nativeElement.files = value;
    }
    else if (Array.isArray(value) && value.length > 0) {
      this.elementRef.nativeElement.files = null;
    }
    else if (value === null) {
      this.elementRef.nativeElement.files = null;
    }
  }

  registerOnChange(callback: (files: File[] | string | null) => void): void {
    this.onChangeCallback = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouchedCallback = callback;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
}
