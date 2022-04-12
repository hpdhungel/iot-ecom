import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor( private cartService: CartService) { }

  cartProducts: any
  user: any 

  userId: number
  

  ngOnInit(): void {
    this.getFromCart()
  }

  getFromCart(){
    this.user = JSON.parse(window.localStorage.getItem('User'))
     console.log(this.user)
     this.userId = this.user.id
      this.cartService.getFromCart(this.user.id).subscribe((data) => {
        this.cartProducts = data
        console.log(data)
        }),
        (error) => {
          console.log(error)
        }
  }

  removeFromCart(product_id){
    this.cartService.removeCart(this.userId, product_id).subscribe((data) => {
      console.log(data)
      this.ngOnInit()
      }),
      (error) => {
        console.log(error)
      }

  }


}
