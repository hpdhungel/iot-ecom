import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) { }

  cartProducts: any
  user: any
  disable: boolean
  userId: number
  total: number = 0
  checkoutTotalprice: number = 0
  removeItem: boolean = false
  showQuantityModel: boolean = false
  productId: number
  currentQuantity: number = 1;
  cartId: number
  ngOnInit(): void {
    this.getFromCart()
    this.totalPrice()

  }
  checkout() {
    for (let i = 0; i < this.cartProducts.length; i++) {
      let tot = parseInt(this.cartProducts[i].price)
      this.checkoutTotalprice = this.checkoutTotalprice + tot
    }
    this.cartService.checkout(this.user.id, this.cartProducts, this.total).subscribe((data) => {
      this.router.navigate(['/orders'])
      this.checkoutTotalprice = 0
    })

  }
  onClickEdit() {
    this.showQuantityModel = true
  }


  disabled() {
    if (this.cartProducts.size === 0) {
      this.disable = false
    }
  }
  totalPrice() {

    
    const t = []

      for (let i = 0; i < this.cartProducts.length; i++) {
         t.push( this.cartProducts[i].price * this.cartProducts[i].quantity)
         console.log(t)
      }
      
      
      for (let i = 0; i < t.length; i++) {
          this.total += t[i];
      }

      
   
  }

  changeQuantity(e) {
    this.cartService.editQuantity(this.userId, this.productId, this.cartId, e).subscribe((data) => {
      this.getFromCart()
    }),
      (error) => {
        console.log(error)
      }
  }

  showQuantity(q, product_id, cart_id) {
    this.showQuantityModel = true
    this.currentQuantity = q
    this.productId = product_id
    this.cartId = cart_id

  }

  getFromCart() {
    this.user = JSON.parse(window.localStorage.getItem('User'))
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
      this.getFromCart()
      this.removeItem = true
    }),
      (error) => {
        console.log(error)
      }
  }

}
