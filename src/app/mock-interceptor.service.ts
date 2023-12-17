import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { Router } from '@angular/router';
import {mock_data} from './api-mocks';

@Injectable({
  providedIn: 'root'
})
export class MockInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (request.url.indexOf('catalog-items') >= 0) {
      return of(new HttpResponse({
        status: 200, body: mock_data.catalog_data
      }));
    }
    if (request.url.indexOf('login') >= 0) {
      return of(new HttpResponse({
        status: 200, body: mock_data.login_mock
      }));
    }

    if (request.url.indexOf('users') >= 0) {
      return of(new HttpResponse({
        status: 200, body: mock_data.users_mock
      }));
    }

    if (request.url.indexOf('orders') >= 0) {
      return of(new HttpResponse({
        status: 200, body: mock_data.orders_mock
      }));
    }

    throw new Error("not mocked!")
    
  }
}


export const mockInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockInterceptorService,
  multi: true,
  deps: [ Router ]
};