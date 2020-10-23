import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Company } from '../company';

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
  private presentation: File|null = null;
  private abstract: File|null = null;

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

  async mysubmit(): Promise<void> {
    if (this.presentation) {
      const buf = await this.presentation.arrayBuffer();
      console.log(buf.byteLength);
    }
    if (this.abstract) {
      const buf = await this.abstract.arrayBuffer();
      console.log(buf.byteLength);
    }
    const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();
    formData.append('presentation', this.presentation, this.presentation.name);
    const response: HttpResponse<object> = await this.http
      .post('https://example.com/avatar', formData, { headers, observe: 'response' })
      .toPromise();
    console.log(response.status);
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
