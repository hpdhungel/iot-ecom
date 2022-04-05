import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  backendUrl = environment.backendApi

  signUp(name: string, email: string, password: string, street: string, city: string, state: string, zip: number){
    return this.http.post(`${this.backendUrl}/api/v1/users`,{name,email, password, street, city, state, zip})
  }
}
