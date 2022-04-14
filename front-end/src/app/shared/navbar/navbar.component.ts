import { ThisReceiver } from '@angular/compiler';
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
          label:'Users',
          icon:'pi pi-fw pi-user',
          items:[
              {
                  label:'New',
                  icon:'pi pi-fw pi-user-plus',

              },
              {
                  label:'Delete',
                  icon:'pi pi-fw pi-user-minus',

              },
              {
                  label:'Search',
                  icon:'pi pi-fw pi-users',
                  items:[
                  {
                      label:'Filter',
                      icon:'pi pi-fw pi-filter',
                      items:[
                          {
                              label:'Print',
                              icon:'pi pi-fw pi-print'
                          }
                      ]
                  },
                  {
                      icon:'pi pi-fw pi-bars',
                      label:'List'
                  }
                  ]
              }
          ]
      },
      {
          label:'Products',
          icon:'pi pi-table',
          routerLink: ['/products']
          
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
      console.log('success')
      this.hideLogout()
    }
  }
}
