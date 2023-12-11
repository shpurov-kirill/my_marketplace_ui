import { Component } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { User } from './model/user';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-market-place';
  isAdmin = false;
  isUserLoggedIn = false;
  username = '';
  token = '';

  constructor(private userServiceService: UserServiceService,
    private router: Router) {

    this.userServiceService.currentUserObservable
    .pipe().subscribe(u => {
      this.isAdmin = u?.role === 'admin';
      this.username = u.username;
      this.token = u.token;
      this.isUserLoggedIn = (u.username || '').length > 0 ;
    });

  }


  logout() {
    this.userServiceService.logout()
  }
  login() {
    this.router.navigate(['login'])
  }
  
}
