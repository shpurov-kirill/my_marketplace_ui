import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent {

  createItemForm: UntypedFormGroup; 
  
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient) {
    this.createItemForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      subTitle: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  } 

 private fval(n: string):string { return this.createItemForm.controls[n].value; }

 async onSubmit() {
  try {
    const item = { 
      title: this.fval('title'),
      subTitle: this.fval('subTitle'),
      image: this.fval('image'),
      price: this.fval('price'),
      text: this.fval('text')
    };
    await firstValueFrom(this.http.put<any>('api/catalog-item', item ));
    this.router.navigate(['/catalog'])

  } catch (e:any) {
    alert(e.message);
  }
 }
}
