import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Applicant } from '../shared/models';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  applicants: Applicant[];

  constructor(
    private http: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    this.applicants = await this.http.get<Applicant[]>('/api/applicant').toPromise();
  }

  async download(i: number): Promise<void> {
    const data: ArrayBuffer = await this.http.get(`/api/file/${this.applicants[i].email}.docx`, { responseType: 'arraybuffer' }).toPromise();
    const blob: Blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url: string = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
