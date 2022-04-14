import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,  private router: Router) {  }
  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl('hpd@example.com', [Validators.required]),
    password: new FormControl('hari', [Validators.required])  
  }); 

  get userEmail(): any {
    return this.loginForm.get('email');
  }

  get userPassword(): any {
    return this.loginForm.get('password');
  }

  signup(){
    this.router.navigate(['/signup'])
  }

  login() {
    let email =this.loginForm.get('email').value
    let password = this.loginForm.get('password').value

    this.loginService.login(email, password).subscribe(query => {
      if(query!=false){
        console.log(query)
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

