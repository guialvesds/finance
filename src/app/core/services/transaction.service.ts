import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Transactions } from '../../shared/models/transaction.modal';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private urlApi = environment.baseApiUrl;  

  constructor(private http: HttpClient, private _walletService: WalletService) { }

  public findTransactions(): Observable<HttpResponse<Transactions>> {
    return this.http.get<Transactions>(`${this.urlApi}/transactions`, {
      observe: 'response',
    });      
  }

  public putTransaction(data: Object): Observable<HttpResponse<Transactions>> {
   return this.http.post<Transactions>(`${this.urlApi}/transactions`, data, {
      observe: 'response',
    })
  }

  public deleteTransaction(idTransaction: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.urlApi}/transactions/${idTransaction}`)
  }
}
