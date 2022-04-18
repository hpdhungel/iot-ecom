import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,  private router: Router) { }

  cartProducts: any
  user: any

  userId: number
  total: number = 0
  checkoutTotalprice:number =0
  removeItem: boolean = false
  ngOnInit(): void {
    this.getFromCart()
  }
checkout(){
  for (let i = 0; i < this.cartProducts.length; i++) {
    let tot = parseInt(this.cartProducts[i].price)
    this.checkoutTotalprice = this.checkoutTotalprice+tot
  }
  console.log(this.total)
  this.cartService.checkout(this.user.id, this.cartProducts, this.total).subscribe((data) => {
    this.router.navigate(['/orders'])
    this.checkoutTotalprice =0
  })

}

  totalPrice() {
    if (this.removeItem) {
      this.removeItem = false
      for (let i = 0; i < this.cartProducts.length; i++) {
        let tot = this.cartProducts[i].price
        this.total = this.total - parseInt(tot)
      }
    } else {
      for (let i = 0; i < this.cartProducts.length; i++) {
        let tot = this.cartProducts[i].price
        this.total = this.total + parseInt(tot)
      }
    }

  }

  getFromCart() {
    this.user = JSON.parse(window.localStorage.getItem('User'))
    console.log(this.user)
    this.userId = this.user.id
    this.cartService.getFromCart(this.user.id).subscribe((data) => {
      this.cartProducts = data
      this.totalPrice()
    }),
      (error) => {
        console.log(error)
      }
  }

  removeFromCart(product_id, cart_id) {
    this.cartService.removeCart(this.userId, product_id, cart_id).subscribe((data) => {
      console.log(data)
      this.getFromCart()
      this.removeItem = true
    }),
      (error) => {
        console.log(error)
      }

  }

}
