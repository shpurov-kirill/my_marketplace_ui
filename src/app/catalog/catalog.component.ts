import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent  implements OnInit{

  catalog_items:any = []

  constructor(private http: HttpClient,
    private userService: UserServiceService
    ) {
    
  }
  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    const r = await firstValueFrom(this.http.get<any>('api/catalog-items'));
    this.catalog_items = r;
  }

  buyNow(id:string): void {
    console.log(`buy now: ${id}`)
  }
  addToCard(id:string): void {
    console.log(`add To Card: ${id}`)
  }

  async deleteItem(id:string) {
    await firstValueFrom(this.http.delete<any>(`api/catalog-item/${id}`));
    await this.refresh();
  }
  
  isAdmin(): boolean {
    return this.userService.currentUserValue?.role === 'admin';
  }

  
}

