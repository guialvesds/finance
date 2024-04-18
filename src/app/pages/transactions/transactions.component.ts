import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DashboardService } from '../../core/services/dashboard.service';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


interface Transaction {
  id: number;
  user_name: string;
  value: number;
  date: string;
  to_wallet: string;
  type: boolean;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements AfterViewInit  {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  transactions: Transaction[] = [];
  displayedColumns: string[] = ['ID', 'Nome', 'Valor', 'Data Entrada',  'Tipo'];
  dataSource = new MatTableDataSource<Transaction>(this.transactions);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _dashboard: DashboardService, private _liveAnnouncer: LiveAnnouncer) {

  }
  ngOnInit(): void {
    this.getTransactions();
  }

  // Buscar Transações
  getTransactions(): void {
  this._dashboard.findTransactions().subscribe({
    next: (response: { body: any; }) => {
      // Atualizando as transações
      this.transactions = response.body;
    },
    error: (err: any) => {
      console.log("Erro ao buscar transações ", err);
    }
  });
}

announceSortChange(sortState: any) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}


}
