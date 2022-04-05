import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private loginService:LoginService,  private router: Router) {  }
  email = new FormControl("");
  password = new FormControl("");


  ngOnInit() {
  }




  login() {
    this.loginService.login(this.email.value, this.password.value).subscribe(query => {
      if(query!=false){
        try {
          localStorage.setItem('User', JSON.stringify(query));
        } catch (e) {
          console.error('Error saving to localStorage', e);
        }
        this.router.navigate([''])   
      } else {
        console.log('Incorrect Username/Password')
      }
    })

  }



  

}

