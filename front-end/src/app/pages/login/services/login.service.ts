

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
backendUrl = environment.backendApi



  constructor(private http: HttpClient) { }


  login(user : any): Observable<any>{
    return this.http.post(`${this.backendUrl}/api/login`, user);
  }



}

