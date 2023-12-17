import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Sort, MatSortModule } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cardList: any[] = []
  sortedData: any[] = [];
  error = ''
  loading = false
  orderId = ''

  constructor(
    private userService: UserServiceService,
    private http: HttpClient) {

    this.cardList = this.userService.card();
    this.sortedData = this.cardList.slice();
  }



  sortData(sort: Sort) {
    const data = this.cardList.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
    } else {
      this.sortedData = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  total():number {
    return this.cardList
    .map(a=> a.price)
    .reduce( (a, b)=> a + b, 0 )
  }
  remove(i: number) : void {
    this.userService.removeFromCard(i);
    this.cardList = this.userService.card();
    this.sortedData = this.cardList.slice();
  }
  submit() : void {
    this.error = '';
    this.loading = true;
    const r = Math.floor(Math.random() * 3)
    // wait for 3 sec
    setTimeout(async () => {
      // 30% prob
      this.loading = false;

      if (r == 0) {
        this.error = "Card Error";
        return
      }
        await this.placeOrder();

    }, 3000);
  }

  async placeOrder() {
    this.orderId = '';
    const ids:string[] = this.sortedData.map(a => a['id'])
    const r = await firstValueFrom(this.http.put<any>('api/order', ids))
    this.userService.removeAllFromCard();
    this.orderId = r['orderId'];
    
    this.cardList = []
    this.sortedData = []
  }
}

