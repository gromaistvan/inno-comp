import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Company, Applicant, loadCompanies } from '../shared/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string;
  email: string;
  phone: string;
  title: string;
  company: Company;
  presentation: File[] | null = null;
  abstract: File[] | null = null;

  readonly companies: Company[];

  constructor(private router: Router, private http: HttpClient) {
    this.companies = loadCompanies();
  }

  async onSubmit(): Promise<void> {
    if (! this.abstract || this.abstract.length === 0) return;
    if (! this.presentation || this.presentation.length === 0) return;

    const formData: FormData = new FormData();
    formData.append('email', this.email);
    formData.append('abstract', this.abstract[0], this.abstract[0].name);
    formData.append('presentation', this.presentation[0], this.presentation[0].name);
    await this.http.post('/api/file', formData).toPromise();

    const applicant: Applicant = {
      name: this.name,
      email: this.email,
      title: this.title,
      phone: this.phone,
      company: this.company
    };
    await this.http.post<Applicant>('/api/applicant', applicant).toPromise();

    this.router.navigate(['../applicants']);
  }
}
