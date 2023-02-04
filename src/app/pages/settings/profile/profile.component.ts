import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    let nameInput = document.getElementById("nameInput") as HTMLInputElement;
    nameInput.value = this.user.name
    let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
    usernameInput.value = this.user.username
    let useridInput = document.getElementById("useridInput") as HTMLInputElement;
    useridInput.value = this.user.user_id
    let sponsorInput = document.getElementById("sponsorInput") as HTMLInputElement;
    sponsorInput.value = this.user.sponsor_id
    let phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
    phoneInput.value = this.user.phone
    let emailInput = document.getElementById("emailInput") as HTMLInputElement;
    emailInput.value = this.user.email
    let activeInput = document.getElementById("activeInput") as HTMLInputElement;
    if (this.user.is_active) {
      activeInput.value = 'Active'
      let activedateInput = document.getElementById("activedateInput") as HTMLInputElement;
      activedateInput.value = this.user.activation_date.split('T')[0]  
    } else {
      activeInput.value = 'In-Active'
    }
    let joindateInput = document.getElementById("joindateInput") as HTMLInputElement;
    joindateInput.value = this.user.join_date.split('T')[0]
  }
}
