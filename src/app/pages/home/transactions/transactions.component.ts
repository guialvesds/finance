import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardService } from '../../../core/services/dashboard.service';
import { Transactions } from '../../../shared/models/transaction.modal';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { NgFor, NgStyle } from '@angular/common';
import { FormTransactionComponent } from '../../../shared/components/form-transaction/form-transaction.component';
import { TransactionService } from '../../../core/services/transaction.service';
import { WalletService } from '../../../core/services/wallet.service';




@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatButtonModule, MatSort, NgStyle, MatSortModule, MatInputModule, MatFormFieldModule, MatIconModule, DialogModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'user_name', 'describe', 'value', 'date', 'type', 'action'];
  dataSource!: MatTableDataSource<Transactions>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subManger!: Subscription;
  unsubscribeSignal: Subject<void> = new Subject();

  constructor(private _dashboard: DashboardService, public _dialog: Dialog, private _transactionService: TransactionService, private _walletService: WalletService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
  }

  // Abre modal para criação de nova transação
 public openDialog(): void {
    const dialogRef = this._dialog.open<string>(FormTransactionComponent, {
    });

    dialogRef.closed.subscribe(result => {
      this.getTransactions();
    });
  }

  // Input de busca 
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Para cor dos icones de acordo com o tipo da transação
  public colorIcoChoice(type: number): string {
    return type == 0 ? "rgb(121, 207, 135)" : "rgb(224, 134, 134)"
  }

  // Formatação de moeda real pt-Br
  public coinRealFormat(data: number): string {
    return data.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }

   // Para cor dos icones de acordo com o tipo da transação
   public colorDescribeType(type: number): string {
    return type == 0 ? "rgb(60,179,113)" : "rgb(255,0,0)"
  }

     // Buscar Transações
     private getTransactions(): void {
      this.subManger = this._dashboard.findTransactions().pipe(
        takeUntil(this.unsubscribeSignal.asObservable()),
  
      ).subscribe({
        next: (response: { body: any; }) => {
          // Atualizando as transações
          this.dataSource = new MatTableDataSource(response.body);
          this.getPaginator()
        },
        error: (err: any) => {
          console.error("Erro ao buscar transações ", err);
        }
      });
    }

    public deleteTransaction(trasactionId: number, valueRemove: number, type: string): void {
      this._transactionService.deleteTransaction(trasactionId).subscribe({
        next: (res) => {

          console.log("excluiu", res);
         

          const walletID: number = type == "0" ? 1 : 2;

          this._walletService.deletetValueWallet(walletID, valueRemove).subscribe({
            next: (res) => {
              console.log("Removeu valor", res);
            },
            error: (err) => {
              console.error(err);
            }
          });

          this.getTransactions();
        },
        error: (err) => {
          console.error(err);          
        }
      });
    }

    // Iniciador para a paginação
    private getPaginator(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
}
