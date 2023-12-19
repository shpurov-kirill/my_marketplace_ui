import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CatalogComponent } from './catalog/catalog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { authInterceptorProvider } from './auth-interceptor.service';
import { AddUserComponent } from './add-user/add-user.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import {MatChipsModule} from '@angular/material/chips'
import {MatSortModule} from '@angular/material/sort'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import { HistoryComponent } from './history/history.component'
import { MatOption, MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { mockInterceptorProvider } from './mock-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterLink } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    AddNewItemComponent,
    LoginComponent,
    UserListComponent,
    AddUserComponent,
    ShoppingCartComponent,
    HistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    FormsModule, ReactiveFormsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    
  ],
  providers: [ authInterceptorProvider, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  //providers: [ mockInterceptorProvider ],
  bootstrap: [AppComponent],
})
export class AppModule { }
