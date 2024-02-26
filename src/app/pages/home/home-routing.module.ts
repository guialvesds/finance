import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAccessComponent } from './home-access/home-access.component';
import { DashboardComponent } from '../../shared/components/dashboard/dashboard.component';
import { TransacoesComponent } from '../../shared/components/transacoes/transacoes.component';
import { WalletComponent } from '../../shared/components/wallet/wallet.component';
import { SettingsComponent } from '../../shared/components/settings/settings.component';



const routes: Routes = [
  {
    path: '', component: HomeAccessComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'transacao', component: TransacoesComponent },
      { path: 'carteira', component: WalletComponent },
      { path: 'configuracao', component: SettingsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }