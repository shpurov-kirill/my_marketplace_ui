import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '',   redirectTo: '/catalog', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'new-item', component: AddNewItemComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: AddUserComponent },
  { path: 'edit-item/:id', component: AddNewItemComponent },
  { path: 'shopping-card', component: ShoppingCartComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
