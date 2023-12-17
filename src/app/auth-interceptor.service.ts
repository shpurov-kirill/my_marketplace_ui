import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private userService: UserServiceService, 
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.currentUserValue?.token ?? '-1';
    
    console.log(`token: ${token}, url: ${request.url}`);

    const s = next.handle(request.clone({
      headers: new HttpHeaders({
        authentication: token
      }),
    }));

    return s.pipe(catchError( e => {
      console.log('http error', e);
      if (e.status === 401) {
        console.log('401 error');
        this.userService.logout();
      }
      throw e;
    }))
  }
}


export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
  deps: [UserServiceService, Router ]
};