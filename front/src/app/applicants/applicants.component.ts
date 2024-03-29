import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Applicant, dates } from '../shared/models';
import { UnderConstruction } from '../shared/under.construction';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent extends UnderConstruction implements OnInit {
  applicants: Applicant[] = [];

  constructor(
    private http: HttpClient) {
    super();
  }

  get overDueDate(): boolean {
    return new Date() >= dates.signup;
  }

  async ngOnInit(): Promise<void> {
    try {
      const applicants: Applicant[] = await this.http.get<Applicant[]>('/api/applicant').toPromise();
      if (applicants.length > 0) {
        this.applicants = applicants;
      }
      else {
        super.ngOnInit();
      }
    }
    catch (error) {
      this.sendError(error.message);
    }
  }

  async download(applicant: Applicant, extension: string): Promise<void> {
    const data: ArrayBuffer = await this.http.get(`/api/file/${applicant.email}.${extension}`, { responseType: 'arraybuffer' }).toPromise();
    let mime: string;
    switch (extension) {
      case 'docx': mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; break;
      case 'pptx': mime = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'; break;
      default: mime = 'application/octet-stream';
    }
    const blob: Blob = new Blob([data], { type: mime });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.setAttribute('download', `${applicant.email}.${extension}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
