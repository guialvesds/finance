import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private urlApi = environment.baseApiUrl;  

  constructor(private http: HttpClient) { }

  public findWallet(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.urlApi}/wallet`, {
      observe: 'response',
    });
  }

  public findTransactions(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.urlApi}/transactions`, {
      observe: 'response',
    });
  }
}
