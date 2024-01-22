import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAccessComponent } from './home-access/home-access.component';



const routes: Routes = [
  { path: '', component: HomeAccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}