import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private ordersService:OrdersService,  private router: Router) {  }
  shippingStatus: any[];
  orders:any
  user:any
  ngOnInit(): void {
    this.getAllOrders()
    this.orderStatus()
  }

  orderStatus(){
    this.shippingStatus = [
      {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
      {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
      {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
      {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
  ];
  }

  getAllOrders() {
    this.user = JSON.parse(window.localStorage.getItem('User'))
    this.ordersService.orders(this.user.id).subscribe((data:any) => {
     this.orders = data
     console.log(this.orders)
    }),
      (error) => {
        console.log(error)
      }
  }

}
