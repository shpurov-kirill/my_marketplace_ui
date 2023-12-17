import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserServiceService } from '../user-service.service';
import { Sort } from '@angular/material/sort';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent  implements OnInit{

  catalog_items:any = []
  sortedData = this.catalog_items.slice();
  filterForm: UntypedFormGroup;

  constructor(private http: HttpClient,
    private userService: UserServiceService,
    private formBuilder: UntypedFormBuilder) {
      this.filterForm = this.formBuilder.group({
        category: [''],
        brand: [''],
        model: [''],
      });
    
  }
  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    const r = await firstValueFrom(this.http.get<any>('api/catalog-items'));
    this.catalog_items = r;
    this.sortedData = this.catalog_items.slice();
  }

  buyNow(id:string): void {
    console.log(`buy now: ${id}`)
  }
  addToCard(it:any): void {
    this.userService.addToCard(it);
  }

  async deleteItem(id:string) {
    await firstValueFrom(this.http.delete<any>(`api/catalog-item/${id}`));
    await this.refresh();
  }
  
  isAdmin(): boolean {
    return this.userService.currentUserValue?.role === 'admin';
  }

  sortData(sort: Sort) {
    const data = this.catalog_items.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
    } else {
      this.sortedData = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  uniqueValues(c: string): string[] {
    const list :string[] =  this.sortedData.map( (a: { [x: string]: any; }) => {
      if (c === 'category') return a['category']
      if (c === 'model') return a['model']
      if (c === 'brand') return a['brand']
      return '';
    })

    return Array.from(new Set(list));
  }

  private fval(n: string):string { return this.filterForm.controls[n].value ?? ''; }

  filter() {
    this.sortedData = this.sortedData.filter( (a: { [x: string]: string; }) => {
        const s = this.fval('category');
        const s1 = a['category'] ;
        if (a['category'] === this.fval('category')) {
          return true;
        }
        if (a['model'] === this.fval('model')) {
          return true;
        }
        if (a['brand'] === this.fval('brand')) {
          return true;
        }

        return false;
    })
  }
  reset() {
    this.sortedData = this.catalog_items.slice();
    this.filterForm.controls['brand'].setValue(null);
    this.filterForm.controls['category'].setValue(null);
    this.filterForm.controls['model'].setValue(null);
  }
}

