import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './services/signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signupService:SignupService) {  }
  name = new FormControl("");
  password = new FormControl("");
  email = new FormControl("");
  street = new FormControl("");
  city = new FormControl("");
  state = new FormControl("");
  zip = new FormControl("");


  ngOnInit(): void {
  }

signup() {

  this.signupService.signUp(this.name.value, this.email.value, this.password.value, this.street.value, this.city.value, this.state.value, this.zip.value).subscribe(query => {
    if(query!=false){
      try {
        localStorage.setItem('User', JSON.stringify(query));
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }
    } else {
      console.log('Incorrect Username/Password')
    }
  })


}





}
