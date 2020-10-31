import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, AsyncValidator, FormGroup } from '@angular/forms';
import { Applicant } from './models';

@Directive({
  selector: '[appUnique]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueNameDirective, multi: true }]
})
export class UniqueNameDirective implements AsyncValidator {
  constructor(private http: HttpClient) {
  }

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const group = control.parent as FormGroup;
    if (! group) {
      return null;
    }
    let name = '';
    Object.keys(group.controls).forEach(key => {
      if (group.get(key) !== control) {
        return;
      }
      name = key;
    });
    if (! name) {
      return null;
    }
    const applicants = await this.http.get<Applicant[]>('/api/applicant').toPromise();
    if (applicants.find(a => a[name].toLocaleLowerCase() === control.value?.toLowerCase())) {
       return { used: control.value };
    }
    return null;
  }
}
