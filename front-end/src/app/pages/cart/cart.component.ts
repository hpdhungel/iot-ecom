import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
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
  disable: boolean
  userId: number
  total: number = 0
  checkoutTotalprice:number =0
  removeItem: boolean = false
  showQuantityModel: boolean = false
  ngOnInit(): void {
    this.getFromCart()
   
  }
checkout(){
  for (let i = 0; i < this.cartProducts.length; i++) {
    let tot = parseInt(this.cartProducts[i].price)
    this.checkoutTotalprice = this.checkoutTotalprice+tot
  }
  this.cartService.checkout(this.user.id, this.cartProducts, this.total).subscribe((data) => {
    this.router.navigate(['/orders'])
    this.checkoutTotalprice =0
  })

}
onClickEdit(){
  this.showQuantityModel = true
}


disabled(){
  if(this.cartProducts.size===0){
    this.disable = false
  }
}
  totalPrice() {
    if (this.removeItem) {
      this.removeItem = false
      for (let i = 0; i < this.cartProducts.length; i++) {
        this.total = this.total - this.cartProducts[i].price * this.cartProducts[i].quantity
      }
    } else {
      for (let i = 0; i < this.cartProducts.length; i++) {
        this.total = this.total + this.cartProducts[i].price * this.cartProducts[i].quantity
      }
    }
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
  editQuantity(product_id, cart_id){
    let quantity = 1
    this.cartService.editQuantity(this.userId, product_id, cart_id, quantity).subscribe((data) => {
      console.log(data)
      this.getFromCart()
      this.removeItem = true
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
