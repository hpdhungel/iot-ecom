import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  backendUrl = environment.backendApi

  orders(user_id: string){
    return this.http.get(`${this.backendUrl}/api/v1/orders/${user_id}`)
  }
}
