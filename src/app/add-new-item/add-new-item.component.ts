import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent {

  createItemForm: UntypedFormGroup; 
  selectedFileNames: string[] = [];
  selectedFiles?: FileList;
  previews: string[] = [];
  id:string | null = null;
  
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute) {
    this.createItemForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['My Items', [Validators.required]],
      brand: ['', [Validators.required]],
      quantity: ['1', [Validators.required]],
      text: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', [Validators.required]],
      price: ['10', [Validators.required]],
    });

    this.route.paramMap.subscribe(async params => {
      this.id = params.get('id');
      if (this.id) {
        await this.loadItem();
      }
   })
  } 

  async loadItem() {
    const r = await firstValueFrom(this.http.get<any>(`api/catalog-item/${this.id}`));
    this.createItemForm.controls['name'].setValue(r.name);
    this.createItemForm.controls['category'].setValue(r.name);
    this.createItemForm.controls['brand'].setValue(r.brand);
    this.createItemForm.controls['quantity'].setValue(r.quantity);
    this.createItemForm.controls['price'].setValue(r.price);
    this.createItemForm.controls['text'].setValue(r.text);
    this.previews = [r.image]
  }

 private fval(n: string):string { return this.createItemForm.controls[n].value; }

 async onSubmit() {
  if (this.previews.length ==0) {
    alert('No Image selected');
  }
  try {
    const item = { 
      id: this.id,
      name: this.fval('name'),
      category: this.fval('category'),
      brand: this.fval('brand'),
      quantity: this.fval('quantity'),
      image: this.previews[0],
      price: this.fval('price'),
      text: this.fval('text')
    };
    await firstValueFrom(this.http.put<any>('api/catalog-item', item ));
    this.router.navigate(['/catalog'])

  } catch (e:any) {
    alert(e.message);
  }
 }

 selectFiles(event: any): void {
  this.selectedFileNames = [];
  this.selectedFiles = event.target.files;

  this.previews = [];
  if (this.selectedFiles && this.selectedFiles[0]) {
    const numberOfFiles = this.selectedFiles.length;
    for (let i = 0; i < numberOfFiles; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(this.selectedFiles[i]);

      this.selectedFileNames.push(this.selectedFiles[i].name);
    }
  }
}

isAdmin(): boolean {
  return this.userService.currentUserValue?.role === 'admin';
}
}
