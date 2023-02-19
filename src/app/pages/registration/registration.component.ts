import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  showPassword:boolean;
  password: string;
  nameInput: HTMLInputElement;
  usernameInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  sponsorInput: HTMLInputElement;
  passwordInput: HTMLInputElement;

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
    this.showPassword = false;
    this.password = "" 
  }

  ngOnInit(): void {}

  hideMessage() {
    document.getElementById('messagebox').style.display = 'none'
  }

  showMessage(message) {
    document.getElementById('message').innerText = message
    document.getElementById('messagebox').style.display = 'block'
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }

  registerUser() {
    this.usernameInput = document.getElementById("username") as HTMLInputElement;
    this.passwordInput = document.getElementById("password") as HTMLInputElement;
    this.nameInput = document.getElementById("name") as HTMLInputElement;
    this.emailInput = document.getElementById("email") as HTMLInputElement;
    this.phoneInput = document.getElementById("phone") as HTMLInputElement;
    this.sponsorInput = document.getElementById("sponsor") as HTMLInputElement;
    var sponsor = this.sponsorInput.value;
    if (this.sponsorInput.value == '') {
      sponsor = null
    }
    var param = {
      "param": {
        "name": this.nameInput.value,
        "email": this.emailInput.value,
        "phone": this.phoneInput.value,
        "sponsor_id": sponsor,
        "username": this.usernameInput.value,
        "password": this.passwordInput.value
      } 
    }
    console.log(param)
    this.http.post<{ data: any, message: string }>('api/AddUser', param).subscribe(response => {
      this.showMessage(response.message)
      if (response.message.startsWith('Info  : New user created')) {
        document.getElementsByTagName('form')[0].reset();
      }
      console.log(response);
    }, error => {
      console.error(error);
    });
  }
}
