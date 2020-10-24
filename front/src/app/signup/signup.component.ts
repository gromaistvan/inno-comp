import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Company, Applicant } from '../models';

interface FileDecriptor {
  is: string;
}


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
  companies: Company[];
  private presentation: File | null = null;
  private abstract: File | null = null;

  constructor(private http: HttpClient) {
    this.companies = [
      { name: 'E-Educatio Információtechnológia Zrt.', ceo: 'Dr. Szőcs Károly' },
      { name: 'eKRÉTA Informatikai Zrt.', ceo: 'Dr. Szabó Balázs' },
      { name: 'ELMS Informatikai Zrt.', ceo: 'Fehér István' },
      { name: 'Max & Future Kft.', ceo: 'Zikkert Antal' },
      { name: 'Rufusz Computer Informatika Zrt.', ceo: 'Fauszt András' },
      { name: 'SDA DMS Zrt.', ceo: 'Bencze György' },
      { name: 'SDA Informatika Zrt.', ceo: 'Szabó Zoltán' },
      { name: 'Webjogsi KMR Autósiskola Zrt.', ceo: 'Dr. Szőcs Károly' }];
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
      abstract: await this.upload(this.abstract),
      presentation: await this.upload(this.presentation),
    };
    const result: Applicant = await this.http.post<Applicant>('/api/applicant', applicant).toPromise();
    console.log(result);
  }

  onAbstract(event: any): void {
    this.abstract = event.files.length > 0
      ? event.files[0]
      : null;
  }

  onPresentation(event: any): void {
    this.presentation = event.files.length > 0
      ? event.files[0]
      : null;
  }
}
