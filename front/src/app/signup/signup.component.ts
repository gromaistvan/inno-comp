import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Message, MessageService } from 'primeng/api';
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

  readonly message: Message[] = [];
  readonly companies: Company[] = loadCompanies();

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService) {
  }

  private sendError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Hiba mentés közben!',
      detail: message || '🎃 Általános hiba!'
    });
  }

  private validate(): boolean {
    if (! this.name || this.name.length < 5) {
      this.sendError('Hibás név!');
      return false;
    }
    if (! this.email || this.email.length < 5) {
      this.sendError('Hibás e-mail cím!');
      return false;
    }
    if (! this.title || this.title.length < 10) {
      this.sendError('Hibás cím!');
      return false;
    }
    if (! this.company) {
      this.sendError('Hibás cég!');
      return false;
    }
    if (! this.abstract || this.abstract.length === 0) {
      this.sendError('Hibás összefoglaló!');
      return false;
    }
    if (! this.presentation || this.presentation.length === 0) {
      this.sendError('Hibás prezentáció!');
      return false;
    }
    return true;
  }

  async onSubmit(): Promise<void> {
    if (! this.validate()) {
      return;
    }

    const formData: FormData = new FormData();
    formData.append('email', this.email);
    formData.append('abstract', this.abstract[0], this.abstract[0].name);
    formData.append('presentation', this.presentation[0], this.presentation[0].name);

    const applicant: Applicant = {
      name: this.name,
      email: this.email,
      title: this.title,
      phone: this.phone,
      company: this.company.name
    };

    try {
      await this.http.post('/api/file', formData).toPromise();
      await this.http.post('/api/applicant', applicant).toPromise();
      this.router.navigate(['../applicants']);
    }
    catch (error) {
      this.sendError(error?.message);
    }
  }
}
