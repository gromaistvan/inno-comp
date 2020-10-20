import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Company {
  name: string;
  author: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  phone: string;
  title: string;
  companies: Company[];
  company: Company;
  private presentation: File|null = null;
  private abstract: File|null = null;
  constructor(private http: HttpClient) {
    this.companies = [
      { name: 'E-Educatio Információtechnológia Zrt.', author: 'Dr. Szőcs Károly' },
      { name: 'eKRÉTA Informatikai Zrt.', author: 'Dr. Szabó Balázs' },
      { name: 'ELMS Informatikai Zrt.', author: 'Fehér István' },
      { name: 'Max & Future Kft.', author: 'Zikkert Antal' },
      { name: 'Rufusz Computer Informatika Zrt.', author: 'Fauszt András' },
      { name: 'SDA DMS Zrt.', author: 'Bencze György' },
      { name: 'SDA Informatika Zrt.', author: 'Szabó Zoltán' },
      { name: 'Webjogsi KMR Autósiskola Zrt.', author: 'Dr. Szőcs Károly' }];
  }
  ngOnInit(): void {
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
    /*
    const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();
    formData.append('presentation', this.presentation, this.presentation.name);
    const response: HttpResponse<object> = await this.http
      .post('https://example.com/avatar', formData, { headers, observe: 'response' })
      .toPromise();
    console.log(response.status);
    */
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
