import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private signupService: SignupService,  private router: Router) { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required])
  });

  get name(): any {
    return this.signupForm.get('name');
  }

  get email(): any {
    return this.signupForm.get('email');
  }
  get password(): any {
    return this.signupForm.get('password');
  }
  get street(): any {
    return this.signupForm.get('street');
  }

  get city(): any {
    return this.signupForm.get('city');
  }
  get state(): any {
    return this.signupForm.get('state');
  }
  get zip(): any {
    return this.signupForm.get('zip');
  }
  
  login(){
    this.router.navigate(['/login'])
  }

  signup() {
    this.signupService.signUp(this.signupForm.get('name').value, this.signupForm.get('email').value, this.signupForm.get('password').value, this.signupForm.get('street').value, this.signupForm.get('city').value, this.signupForm.get('state').value, this.signupForm.get('zip').value).subscribe(query => {
      if (query != false) {
        try {
          localStorage.setItem('User', JSON.stringify(query));
          this.router.navigate(['/'])
        } catch (e) {
          console.error('Error saving to localStorage', e);
        }
      } else {
        console.log('Incorrect Username/Password')
      }
    })
  }
}
