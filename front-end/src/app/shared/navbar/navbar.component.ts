import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private route: Router) { }

  logoutButton:boolean = true;

  ngOnInit(): void {
    this.hideLogout()
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

  logout(){
    localStorage.removeItem("User");
    var user = window.localStorage.getItem('User');
    if (user==null){
      console.log('success')
      this.hideLogout()
    }
  }
}
