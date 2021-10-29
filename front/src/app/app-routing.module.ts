import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantsComponent } from './applicants/applicants.component';
import { InfoComponent } from './info/info.component';
import { JuryComponent } from './jury/jury.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CanActivateMenu } from './shared/can-activate-menu';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'signup', component: SignupComponent, canActivate: [CanActivateMenu] },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'recordings', component: RecordingsComponent, canActivate: [CanActivateMenu] },
  { path: 'applicants', component: ApplicantsComponent },
  { path: 'jury', component: JuryComponent },
  { path: '', redirectTo: '/info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
