import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.hideLogout()

  }

  logoutButton:boolean = true;

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
