import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Transactions } from '../../shared/models/transaction.modal';
import { Wallets } from '../../shared/models/wallet.modal';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private urlApi = environment.baseApiUrl;  

  constructor(private http: HttpClient) { }

  public findWallet(): Observable<HttpResponse<Wallets>> {
    return this.http.get<Wallets>(`${this.urlApi}/wallet`, {
      observe: 'response',
    });
  }

  public findTransactions(): Observable<HttpResponse<Transactions>> {
    return this.http.get<Transactions>(`${this.urlApi}/transactions`, {
      observe: 'response',

    });      
  }
}
