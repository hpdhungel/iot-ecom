import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }
  backendUrl = environment.backendApi

  getUserById(id:string){
    return this.http.get(`${this.backendUrl}/api/v1/user/${id}`)

  }

  updateUser(name:string, email, street, city, state, zip, userId){
    return this.http.put(`${this.backendUrl}/api/v1/user/`, {name, email, street, city, state, zip, userId})

  }
}
