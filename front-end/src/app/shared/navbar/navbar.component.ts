import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private route: Router) { }
  items: MenuItem[];

  logoutButton:boolean = true;

  ngOnInit(): void {
    this.hideLogout(),
    this.items = [
      {
          label:'Dashboard',
          icon:'pi pi-home',
          routerLink: ['']

      },
      {
          label:'Products',
          icon:'pi pi-table',
          routerLink: ['/products']
      },
      {

        label:'Account',
        icon:'pi pi-fw pi-user',
        items:[
            {
                label:'Orders',
                icon:'pi pi-book',
                routerLink: ['/orders']
            },
            {
                label:'Cart',
                icon:'pi pi-shopping-cart',
                routerLink: ['/cart']
            }
        ]
    }
  ];
  }

  cart(){
    this.route.navigate(['/cart'])
  }

  hideLogout(){
    var user = window.localStorage.getItem('User');
    if (user==null){
      this.logoutButton= false
    } else {
      this.logoutButton= true
    }
  }

  login(){
    this.route.navigate(['/login'])
  }

  logout(){
    localStorage.removeItem("User");
    var user = window.localStorage.getItem('User');
    if (user==null){
      this.route.navigate(['/'])
      console.log('success')
      this.hideLogout()
    }
  }
}
