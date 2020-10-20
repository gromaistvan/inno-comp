import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { InfoComponent } from './info/info.component';
import { JuryComponent } from './jury/jury.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'schedule', component: InfoComponent },
  { path: 'recording', component: InfoComponent },
  { path: 'applicant', component: InfoComponent },
  { path: 'jury', component: JuryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
