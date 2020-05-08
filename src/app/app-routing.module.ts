import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsComponent } from './users/details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UpdateContactComponent } from './users/update-contact/update-contact.component';


const routes: Routes = [
  {path: '', component: DetailsComponent},
  {path: 'contact', component: UserCreateComponent},
  {path: 'edit/:id', component: UserCreateComponent},
  {path: 'update/:id', component: UpdateContactComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
