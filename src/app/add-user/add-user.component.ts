import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserServiceService } from '../user-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  createUserForm: UntypedFormGroup; 
  id:string | null = null;
  
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    ) {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      isAdmin: [false, []],
    });

    this.route.paramMap.subscribe(async params => {
      let id = params.get('id');
      this.id = id;
      if (id) {
        await this.loadUser(id);
      }
   })
  } 

  private fval(n: string):string { return this.createUserForm.controls[n].value; }

  async loadUser(id:string) {
    const r = await firstValueFrom(this.http.get<any>(`api/user/${id}`));
    this.createUserForm.controls['name'].setValue(r['name']);
    this.createUserForm.controls['password'].setValue(r['password']);
    this.createUserForm.controls['address'].setValue(r['address']);
    this.createUserForm.controls['isAdmin'].setValue(r['role'] === 'admin');
  }

  async onSubmit() {
    try {
      const item = { 
        id: this.id,
        name: this.fval('name'),
        password: this.fval('password'),
        address: this.fval('address'),
        role: this.fval('isAdmin') ? 'admin': null,
      };
      const r = await firstValueFrom(this.http.put<any>('api/add-user', item ));
      
      if (this.id === null) {
        const user: User = {username: item.name, token: r['id'], role: r['role']}
        this.userService.authenticate( user);
        this.router.navigate(['catalog'])
      } else {
        if (this.userService.currentUserValue?.role  == 'admin') {
          this.router.navigate(['user-list']);
        } else {
          this.router.navigate(['catalog'])
        }
      }
  
    } catch (e:any) {
      alert(e.message);
    }
  }
}
