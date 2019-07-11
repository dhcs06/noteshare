import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
