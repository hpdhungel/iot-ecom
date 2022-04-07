import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  backendUrl = environment.backendApi

  getProducts(){
    return this.http.get(`${this.backendUrl}/api/v1/products`)
  }

  createProduct(name:string, description:string, price:number, quantity:number){
    return this.http.post(`${this.backendUrl}/api/v1/product`, {name, description, price, quantity })
  }

  updateProduct(name:string, description:string, price:number, quantity:number, id:number){
    return this.http.post(`${this.backendUrl}/api/v1/product`, {name, description, price, quantity, id })
  }

  deleteProduct(id:number){
    return this.http.post(`${this.backendUrl}/api/v1/delete-product`, { id })
  }

}
