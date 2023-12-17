import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  displayedColumns = ["id","orderId", 'itemId', 'itemName','userId','userName', 'address', 'time'];
  history  = []
  constructor(private http: HttpClient) { }

  async ngOnInit() {
   this.history = await firstValueFrom(this.http.get<any>('api/orders' ));
  }
}
