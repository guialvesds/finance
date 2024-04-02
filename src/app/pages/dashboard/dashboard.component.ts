import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../core/services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  wallets: any = [];
  transactions: any = [];
  chart: Chart<"line", string[], never> | any;
  tEntrada: any = 0;
  tRetirada: any = 0;
  tDatas: any = '';




  constructor(private _dashboard: DashboardService) {

  }

  ngOnInit(): void {
    this.getWallet();
    this.getTransactions();
    this.createChart();
  }

  getWallet(): void {
    this._dashboard.findWallet().subscribe(({
      next: (item: { body: any; }) => {
        this.wallets = item.body;
        console.log(this.wallets);

      },
      error: (err: any) => {
        console.log("Erro ao buscar carteiras ", err);

      }
    }));
  }

  getTransactions(): void {
    this._dashboard.findTransactions().subscribe(({
      next: (item: { body: any; }) => {
        this.transactions = item.body;
        console.log(this.transactions)

        const entradaTransactions = this.transactions.filter((item: { to_wallet: string; }) => item.to_wallet === "Entrada");
        const entradaValues = entradaTransactions.map((item: { value: any; }) => item.value);

        const saidaTransactions = this.transactions.filter((item: { to_wallet: string; }) => item.to_wallet === "Retirada");
        const saidaValues = saidaTransactions.map((item: { value: any; }) => item.value);

        this.tEntrada = entradaValues.reduce((acc: number, value: any) => acc + value, 0);
        this.tRetirada = saidaValues.reduce((acc: number, value: any) => acc + value, 0);

        
        
        const groupedTransactions = this.transactions.reduce((groups: {[date: string]: any[]}, transaction: any) => {
          const date = transaction.date; 
          if (!groups[date]) {
              groups[date] = [];
          }
          groups[date].push(transaction);
          return groups;
      }, {});
      
      
      this.tDatas = Object.keys(groupedTransactions).filter((date: string) => groupedTransactions[date].length > 1);
        
      },
      error: (err: any) => {
        console.log("Erro ao buscar transações ", err);
      }
    }));
  }

  createChart() {

    this.chart = new Chart('Mychart',
      {
        type: 'bar',
        options: {
          animation: false,
        },
        data: {
          labels: this.tDatas,
          datasets: [
            {
              label: 'Entrada',
              data: this.tEntrada
            },
            {
              label: 'Retirada',
              data: this.tRetirada
            }
          ]
        }
      }
    )
    console.log("Abiu o chart");

  }
}

