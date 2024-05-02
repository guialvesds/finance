import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Users } from '../../shared/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private urlApi = environment.baseApiUrl;  

  constructor(private http: HttpClient) { }

  public login(): Observable<HttpResponse<Users>> {
    return this.http.get<Users>(`${this.urlApi}/user`, {
      observe: 'response',
    });      
  }
}
