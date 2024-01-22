import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { LoginAccessComponent } from './login-access/login-access.component';
import { CreateAccountComponent } from './create-account/create-account.component';



@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
