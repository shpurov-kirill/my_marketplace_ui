import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/user';
import { Router } from '@angular/router';

const CurrentUserKey = 'mymarketplace-user'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor( private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(CurrentUserKey) ?? '{}'));

     this.currentUser = this.currentUserSubject.asObservable();
  }

  authenticate(user: User) {
    localStorage.setItem(CurrentUserKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem(CurrentUserKey);
    this.currentUserSubject.next(Object({}));
    this.router.navigate(['/login'])
  }

  public get currentUserObservable(): Observable<User> {
    return this.currentUser;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


}
