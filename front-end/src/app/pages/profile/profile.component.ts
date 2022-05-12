import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any
  edit:boolean=false

  userForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    street: new FormControl(""),

    city: new FormControl(""),
    state: new FormControl(""),
    zip: new FormControl(""),
    userID: new FormControl("")


  }); 


  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getUser()
  }


  getUser() {
    this.user = JSON.parse(window.localStorage.getItem('User'))
    this.profileService.getUserById(this.user.id).subscribe((data:any) => {
     this.user = data[0]
    }),
      (error) => {
        console.log(error)
      }
  }

  editProfile(){
    this.edit= !this.edit
    console.log(this.edit)
  }


  updateUser() {
    this.edit=false

  //   this.profileService.updateUser(
  //     this.userForm.get('name').value, 
  //     this.userForm.get('email').value, 
  //     this.userForm.get('street').value,
  //     this.userForm.get('city').value, 
  //     this.userForm.get('state').value, 
  //     this.userForm.get('zip').value,
  //     this.userForm.get('userId').value

  //     ).subscribe(data => {
  //     if (data) {
  //       this.getUser()
  //     } else {
  //       console.log('something went wrong')
  //     }
  //   })
  // }
  }
}
