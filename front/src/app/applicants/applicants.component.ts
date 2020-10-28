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

  constructor(private http: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    this.applicants = await this.http.get<Applicant[]>('/api/applicant').toPromise();
  }
}
