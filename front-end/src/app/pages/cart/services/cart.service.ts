import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  user: any
  userId: number
  constructor(private http: HttpClient) { }
  
  backendUrl = environment.backendApi

  getFromCart(user_id){
      return this.http.get(`${this.backendUrl}/api/v1/carts/`+user_id)   
  }
  removeCart(user_id, product_id){
    return this.http.post(`${this.backendUrl}/api/v1/remove-cart`, {user_id, product_id} )   
}


}

