import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom} from 'rxjs';
import { Applicant } from '../shared/models';
import { UnderConstruction } from '../shared/under.construction';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent extends UnderConstruction implements OnInit {
  applicants: Applicant[] = [];

  constructor(
    private http: HttpClient) {
    super();
  }

  async ngOnInit(): Promise<void> {
    try {
      const applicants: Applicant[] = await firstValueFrom(this.http.get<Applicant[]>('/api/applicant'));
      const baseTime = new Date(2020, 11, 10, 15, 0, 0);
      let i = 0;
      for (const applicant of applicants) {
        applicant.presentationTime = new Date(baseTime.getTime() + i * 25 * 60 * 1000);
        ++i;
      }
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
}
