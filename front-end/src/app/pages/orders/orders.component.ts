import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private ordersService:OrdersService,  private router: Router) {  }

  orders:any
  user:any
  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders() {
    this.user = JSON.parse(window.localStorage.getItem('User'))
    this.ordersService.orders(this.user.id).subscribe((data:any) => {
     this.orders = data
    }),
      (error) => {
        console.log(error)
      }
  }

}
