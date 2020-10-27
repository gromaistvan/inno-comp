import { Component } from '@angular/core';
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

  constructor(private http: HttpClient) {
    this.companies = loadCompanies();
  }

  async upload(file: File|null): Promise<string|null> {
    if (! file) return null;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const result: any = await this.http.post('/api/upload', formData).toPromise();
    return `${result.id}`;
  }

  async onSubmit(): Promise<void> {
    const applicant: Applicant = {
      name: this.name,
      email: this.email,
      title: this.title,
      phone: this.phone,
      company: this.company,
      abstract: await this.upload(this.abstract?.length > 0 ? this.abstract[0] : null),
      presentation: await this.upload(this.presentation?.length > 0 ? this.presentation[0] : null),
    };
    const result: Applicant = await this.http.post<Applicant>('/api/applicant', applicant).toPromise();
  }
}
