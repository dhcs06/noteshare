import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: any = {};
  userList: User[] = [];
  alert: String;
  success: String;
  selectedValue: string;

  constructor(
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit() {
  }

  clearAlert() {
    this.alert = '';
  }

  clearSuccess(){
    this.success = "";
  }
  menuChange(event) {
    this.selectedValue = event.target.value;
  }
  signUp(event) {
    const user: User = {
      username: this.form.username,
      password: this.form.password,
      questionId: this.selectedValue,
      answer: this.form.answer
    };

    console.log(this.form.answer)
    this.usersService.addUser(user).subscribe(
      _ => {
        this.success = "Sikeres regisztráció";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        if (error.status === 400) {
          this.clearSuccess();
          this.alert = 'A felhasználónév létezik már';
        }
      }
    );
  }
}
