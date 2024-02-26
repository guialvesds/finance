import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeAccessComponent } from './home-access/home-access.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [HomeAccessComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatSidenav, MatToolbarModule, MatIconModule, MatListModule,
  ]
})
export class HomeModule { }
