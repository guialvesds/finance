import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Wallets } from '../../shared/models/wallet.modal';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  
  private urlApi = environment.baseApiUrl;  

  constructor(private http: HttpClient) { }

  public findWallets(): Observable<HttpResponse<Wallets>> {

    return this.updateBalance().pipe(() => {
      return this.http.get<Wallets>(`${this.urlApi}/wallet`, {
        observe: 'response',
      }); 
    });
  }

  public findOneWallet(id: number): Observable<HttpResponse<Wallets>> {
    
      return this.http.get<Wallets>(`${this.urlApi}/wallet/${id}`, {
        observe: 'response',
      }); 
  
  }

  public insertValueWallet(walletID: number, valueAdd: number): Observable<HttpResponse<Wallets>> {
    return this.http.get<Wallets>(`${this.urlApi}/wallet/${walletID}`).pipe(
      mergeMap((wallet: Wallets) => {
        if (wallet) {
          wallet.value += valueAdd;
          return this.http.patch<Wallets>(`${this.urlApi}/wallet/${walletID}`, { value: wallet.value }, {
            observe: 'response'
          }).pipe(
            mergeMap(() => {
              // Após atualizar o valor da wallet, atualiza o saldo da carteira
              return this.updateBalance();
            })
          );
        } else {
          return throwError({ error: 'Wallet not found' });
        }
      })
    );
  }
  
  private updateBalance(): Observable<HttpResponse<Wallets>> {
    let totalEntrance!: number;
    let totalExpense!: number;

    // Chamadas para obter os valores das wallets de entrada e despesa
    const entrance$ = this.findOneWallet(1).pipe(
        tap(res => {
            totalEntrance = res.body!.value;
            console.log(totalEntrance);
            
        })
    );

    const expense$ = this.findOneWallet(2).pipe(
        tap(res => {
            totalExpense = res.body!.value;
            console.log(totalExpense);
        })
    );

    // Aguarda até que ambas as chamadas sejam concluídas
    return forkJoin([entrance$, expense$]).pipe(
        mergeMap(() => {
            const balance = totalEntrance - totalExpense;
            // Atualiza o valor da wallet 3 com o saldo calculado
            return this.http.patch<any>(`${this.urlApi}/wallet/3`, { value: balance }, {
                observe: 'response'
            });
        })
    );
}
  }
  
  
  

