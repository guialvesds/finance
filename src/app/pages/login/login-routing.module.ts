import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAccessComponent } from './login-access/login-access.component';
import { CreateAccountComponent } from './create-account/create-account.component';


const routes: Routes = [
  { path: '', component: LoginAccessComponent },
  { path: 'createAccount', component: CreateAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}