import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Transactions } from '../../shared/models/transaction.modal';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private urlApi = environment.baseApiUrl;  

  constructor(private http: HttpClient) { }

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
}
