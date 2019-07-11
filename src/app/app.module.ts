import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {ConfirmEqualValidatorDirective} from './_shared/confirm-equal-validation.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MilestonesComponent } from './content/milestones/milestones.component';
import { NoteshareComponent } from './content/noteshare/noteshare.component';
import { ProfileComponent } from './content/profile/profile.component';
import { TimetableComponent } from './content/timetable/timetable.component';
import { CalendarComponent } from './content/timetable/calendar/calendar.component';
import { FileuploaderComponent } from './content/timetable/fileuploader/fileuploader.component';
import { RouterModule } from '@angular/router';
import { UsersService } from './_services/users.service';
import { DownloadService } from './_services/download.service';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SubjectService } from './_services/subjectservice';
import { CalendarService } from './_services/calendar.service';
import { FlatpickrModule } from 'angularx-flatpickr';
import 'flatpickr/dist/flatpickr.css';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    HeaderComponent,
    MilestonesComponent,
    NoteshareComponent,
    ProfileComponent,
    TimetableComponent,
    CalendarComponent,
    FileuploaderComponent,
    ConfirmEqualValidatorDirective
  ],
  imports: [
    BrowserModule.withServerTransition({appId:'ng-cli-universal'}),
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    FlatpickrModule.forRoot(),
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }) ],

  providers: [UsersService, SubjectService, CalendarService, DownloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
