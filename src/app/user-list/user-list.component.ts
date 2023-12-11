import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  user_items = [];
  constructor(private http: HttpClient,
    private userService: UserServiceService
  ) {

  }
  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    const r = await firstValueFrom(this.http.get<any>('api/users'))
    this.user_items = r;
  }
}
