import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MessageModule }  from 'primeng/message';
import { MessagesModule }  from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { JuryComponent } from './jury/jury.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    JuryComponent,
    ScheduleComponent,
    RecordingsComponent,
    ApplicantsComponent,
    SignupComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    DropdownModule,
    RadioButtonModule,
    AccordionModule,
    MenubarModule,
    CardModule,
    InputTextModule,
    InputMaskModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
