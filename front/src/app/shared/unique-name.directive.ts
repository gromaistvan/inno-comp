import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Applicant } from './models';

@Directive({
  selector: '[appUnique]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UniqueNameDirective,
    multi: true
  }]
})
export class UniqueNameDirective implements AsyncValidator {
  constructor(private http: HttpClient) {
  }

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const applicants = await this.http.get<Applicant[]>('/api/applicant').toPromise();
    if (! applicants.find(a => a.name.toLocaleLowerCase() === control.value?.toLowerCase())) {
       return { used: control.value };
    }
    if (! applicants.find(a => a.email.toLocaleLowerCase() === control.value?.toLowerCase())) {
      return { used: control.value };
    }
    return null;
  }
}
