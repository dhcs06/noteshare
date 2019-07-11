import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UsersService } from '../_services/users.service';
import { window } from 'rxjs/operators';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  alert: String;
  alertForgotPwd: String;
  danger = false;
  success = false;
  inProgress = false;
  rightAnswer = false;
  question: string;
  existUser= false;
  actualUser = new User();

  constructor(
    private userService: UsersService,
    private router: Router) { }

  ngOnInit() {
  }

  existingUser(){
    this.userService.getUser(this.form.user).subscribe(
      _ => {
        this.actualUser.username = _.username;
        this.actualUser.answer = _.answer;
        this.actualUser.questionId = _.questionId;
        if(_ != null ){
            this.existUser = true;
          if(_.questionId === "1")
            this.question = "Mi volt az első háziállatod neve?";
          else if(_.questionId === "2")
            this.question = "Anyukád születési helye?";
          else if(_.questionId === "3")
            this.question = "Legjobb barátod/barátnőd neve?";
          else if(_.questionId === "4")
            this.question = "Kedvenc ünneped?";
        } 
        this.clearAlert();
      },
      error => {
        if (error.status === 404) {
          this.danger = true;
          this.alertForgotPwd = 'Nem létező felhasználó!';
        }
      }
    );
  }

  updatePassword(){
    if(this.actualUser.answer === this.form.answer){
      this.actualUser.password = this.form.repassword;
      this.userService.updatePassword(this.actualUser).subscribe(
        _ => {
          this.success = true;
          this.alertForgotPwd = "Sikeresen módosítottad a jelszavad!"
        }
      );
    } else {
      this.alertForgotPwd = "Nem ez a válasz szerepel az adatbázisban!";
      this.danger = true;
    }
  }

  clearAlert() {
    this.alert = '';
    this.alertForgotPwd = '';
    this.danger = false;
    this.success = false;
    this.inProgress = false;
  }

  login() {
    this.inProgress = true;
    this.alert = 'Bejelentkezés folyamatban...';
    const user: User = {
      username: this.form.username,
      password: this.form.password,
      questionId: null,
      answer: null
    };
    this.userService.getUser(user.username).subscribe(
      _ => {
        if (_.password !== user.password) {
          this.alert = 'Téves jelszó';
        } else {
          this.userService.login(user.username);
          this.inProgress = false;
          this.success = true;
          this.alert = 'Sikeres bejelentkezés';
          setTimeout(() => {
            this.router.navigate(['/timetable']);
          }, 2000);
        }
      },
      error => {
        if (error.status === 404) {
          this.danger = true;
          this.alert = 'Nem létező felhasználó!';
        }
      }
    );
  }
}
