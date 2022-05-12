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
  acc:boolean=true
  

  account: MenuItem = {
    label:'Account',
    icon:'pi pi-fw pi-user',
    items:[
        {
          label:'Profile',
          icon:'pi pi-book',
          routerLink: ['/user']
        },
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

  ngOnInit(): void {
    this.hideLogout(),

    this.account.visible = this.acc;

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
      this.account
      
  ];
  }

  cart(){
    this.route.navigate(['/cart'])
  }

  hideLogout(){
    var user = window.localStorage.getItem('User');
    if (user==null){
      this.logoutButton= false
      this.acc = false
    } else {
      this.logoutButton= true
      this.acc = true
      
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
