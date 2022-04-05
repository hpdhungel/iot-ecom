
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  backendUrl = environment.backendApi

  login(email: string, password: string){
    return this.http.post(`${this.backendUrl}/api/v1/login`,{email, password})
  }
}


