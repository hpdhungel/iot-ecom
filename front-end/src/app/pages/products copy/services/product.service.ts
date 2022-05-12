import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  backendUrl = environment.backendApi



  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];





  getProducts() {
    return this.http.get(`${this.backendUrl}/api/v1/products`)

      .toPromise()
      .then(res => <Product[]>res)
      .then(data => { return data; });
  }



 
  
  

  getProducts1(){
    return this.http.get(`${this.backendUrl}/api/v1/products`)
  }

  createProduct(name:string, description:string,  imgUrl:string, price:number, quantity:number){
    return this.http.post(`${this.backendUrl}/api/v1/product`, {name, description, imgUrl, price, quantity })
  }

  updateProduct(name:string, description:string,  imgUrl:string, price:number, quantity:number, product_id:number){
    return this.http.put(`${this.backendUrl}/api/v1/product`, {name, description, imgUrl, price, quantity, product_id })
  }

  deleteProduct(id:number){
    return this.http.post(`${this.backendUrl}/api/v1/delete-product`, { id })
  }

  addToCart(product_id:number, user_id:number){
    return this.http.post(`${this.backendUrl}/api/v1/cart`, { product_id, user_id })
  }
}
