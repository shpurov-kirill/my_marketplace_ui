import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { UserServiceService } from '../user-service.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: UntypedFormGroup;
  errorStr = '';

  constructor(private formBuilder: UntypedFormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private http: HttpClient){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get fval() { return this.loginForm.controls; }
  get username()  { return this.fval['username'].value; }
  get password()  { return this.fval['password'].value; }

  async onLogin() {
    try {
      this.errorStr = '';
      const data = {
        name: this.username,
        password: this.password,
      }
      const r = await firstValueFrom(this.http.post<any>('api/login', data));
      const token = r['id']; // nice to have: implement a proper authetication token, e.g. oauth2
      const role = r['role'];
      const username = r['name'];
      const user: User = {username, token, role};
      this.userService.authenticate(user);
      this.router.navigate(['/catalog'])

    } catch(e: any) {
      this.errorStr = "Could not authenticate";
    }
  }
}
