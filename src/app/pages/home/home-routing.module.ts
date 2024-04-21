import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAccessComponent } from './home-access/home-access.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { InitialComponent } from './initial/initial.component';



const routes: Routes = [
  {
    path: '', component: HomeAccessComponent,
    children: [
      { path: 'initial', component: InitialComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'transacao', component: TransactionsComponent },
      // { path: 'carteira', component: WalletComponent },
      // { path: 'configuracao', component: SettingsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }