import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../core/services/dashboard.service';
import { Subject, Subscription, takeUntil } from 'rxjs';



interface Transaction {
  id: number;
  user_name: string;
  value: number;
  date: string;
  to_wallet: string;
  type: boolean;
}

interface UserData {
  user_name: string;
  transaction_count: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  wallets: any = [];
  transactions: Transaction[] | any = [];
  chart: Chart<"line", string[], never> | any | Subscription;

  subManger!: Subscription;
  unsubscribeSignal: Subject<void> = new Subject();

  constructor(private _dashboard: DashboardService) {

  }

  ngOnInit(): void {
    this.getWallet();
    this.getTransactions();
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();   
  }
  //Buscar Carteiras
  getWallet(): void {
    this._dashboard.findWallet().pipe(
      takeUntil(this.unsubscribeSignal.asObservable()),
    ).subscribe(({
      next: (item: { body: any; }) => {
        this.wallets = item.body;
        console.log(this.wallets);

      },
      error: (err: any) => {
        console.log("Erro ao buscar carteiras ", err);
      }
    }));
  }

  // Buscar Transações
  getTransactions(): void {
    this.subManger = this._dashboard.findTransactions().pipe(
      takeUntil(this.unsubscribeSignal.asObservable()),
    ).subscribe(({
      next: (item: { body: any; }) => {
        this.transactions = item.body;
        setTimeout(() => {
          this.createChart();
          this.chartPerson();
        });

      },
      error: (err: any) => {
        console.log("Erro ao buscar transações ", err);
      }
    }));
  }

  // Criar o chart de total de transações no mês
  createChart() {
    const entradaTotals: number[] = [];
    const retiradaTotals: number[] = [];

    // Agrupar transações por data e tipo
    const groupedTransactions: { [key: string]: { Entrada: number; Retirada: number } } = {};
    this.transactions.forEach((transaction: Transaction) => {
      if (!groupedTransactions[transaction.date]) {
        groupedTransactions[transaction.date] = { Entrada: 0, Retirada: 0 };
      }
      if (transaction.to_wallet === "Entrada") {
        groupedTransactions[transaction.date].Entrada += transaction.value;
      } else {
        groupedTransactions[transaction.date].Retirada += transaction.value;
      }
    });

    // Extrair datas únicas
    const dates: string[] = Object.keys(groupedTransactions);

    // Extrair totais de entrada e retirada para cada data
    dates.forEach(date => {
      entradaTotals.push(groupedTransactions[date].Entrada);
      retiradaTotals.push(groupedTransactions[date].Retirada);
    });

    this.chart = new Chart('transactions-value-chart',
      {
        type: 'bar',
        options: {
          // animation: false,
        },
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Entrada',
              data: entradaTotals
            },
            {
              label: 'Retirada',
              data: retiradaTotals
            }
          ]
        }
      }
    )
  }

  chartPerson(): void {

    // Array para armazenar os dados de usuário e transações
    const userData: UserData[] = [];

    // Agrupar transações por user_name e armazenar os dados
    const groupedTransactionsByUser: { [key: string]: number } = {};
    this.transactions.forEach((transaction: UserData) => {
      if (!groupedTransactionsByUser[transaction.user_name]) {
        groupedTransactionsByUser[transaction.user_name] = 0;
      }
      groupedTransactionsByUser[transaction.user_name]++;
    });

    // Preencher o array userData com os dados de usuário e transações
    Object.keys(groupedTransactionsByUser).forEach(user_name => {
      const totalTransactions = groupedTransactionsByUser[user_name];
      userData.push({ user_name: user_name, transaction_count: totalTransactions });
    });
    this.chart = new Chart('transactions-person-chart',
      {
        type: 'pie',
        options: {
        },
        data: {
          labels: userData.map(item => item.user_name),
          datasets: [
            {
              // label: `${userData.map(item => item.user_name)}`,
              data: userData.map(item => item.transaction_count)
            }
          ]
        }
      }
    )
  }
}

