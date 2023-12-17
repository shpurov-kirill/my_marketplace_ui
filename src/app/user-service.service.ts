import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/user';
import { Router } from '@angular/router';

const CurrentUserKey = 'mymarketplace-user'
const ShoppingCardKey = 'mymarketplace-card'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private cartCountSubject: BehaviorSubject<Number>;
  public cartCount: Observable<Number>;
  
  constructor( private router: Router) { 
    this.cartCountSubject = new BehaviorSubject<Number>(
      this.card().length);

    this.cartCount = this.cartCountSubject.asObservable();

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
  public card(): any[]{
    return JSON.parse(localStorage.getItem(ShoppingCardKey) ?? '[]');
  }

  public addToCard(item: any){
    const list:any[] = this.card();
    list.push(item);
    localStorage.setItem(ShoppingCardKey, JSON.stringify(list))
    this.cartCountSubject.next(list.length);
  }

  public removeFromCard(i: number){
    const list:any[] = this.card();
    list.splice(i, 1);
    localStorage.setItem(ShoppingCardKey, JSON.stringify(list))
    this.cartCountSubject.next(list.length);
  }

  public get cartCountObservable(): Observable<Number> {
    return this.cartCount;
  }

  removeAllFromCard() {
    localStorage.removeItem(ShoppingCardKey)
    this.cartCountSubject.next(0);
  }

}
