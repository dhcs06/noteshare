import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TimetableComponent } from './content/timetable/timetable.component';
import { MilestonesComponent } from './content/milestones/milestones.component';
import { NoteshareComponent } from './content/noteshare/noteshare.component';
import { ProfileComponent } from './content/profile/profile.component';
import { CalendarComponent } from './content/timetable/calendar/calendar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'timetable', component: TimetableComponent },
  { path: 'milestones', component: MilestonesComponent },
  { path: 'noteshare', component: NoteshareComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'calendar', component: CalendarComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})]
})
export class AppRoutingModule { }