import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { AuthService } from 'app/services/auth.service';

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
  sponsor_id: string;

  constructor(private http: HttpClient, private router: Router) {
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
    if (this.sponsorInput.value == '' ||
        this.usernameInput.value == '' ||
        this.passwordInput.value == '' ||
        this.nameInput.value == '' ||
        this.emailInput.value == '' ||
        this.phoneInput.value == '') {
      this.showMessage('Error : Enter required details!')
      return;
    }
    var param = {
      "param": {
        "name": this.nameInput.value,
        "email": this.emailInput.value,
        "phone": this.phoneInput.value,
        "sponsor_id": this.sponsor_id,
        "username": this.usernameInput.value,
        "password": this.passwordInput.value
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/AddUser', param).subscribe(response => {
      this.showMessage(response.message)
      if (response.message.startsWith('Info  : New user created')) {
        document.getElementsByTagName('form')[0].reset();
        document.getElementById('sponsor_name').style.display = 'none'
      }
    }, error => {
      console.error(error);
    });
  }

  getSponsorDetails() {
    var sponsor_username = document.getElementById('sponsor') as HTMLInputElement
    var param = {
      "param": {
        "username": sponsor_username.value
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetails', param).subscribe(response => {
      if (response.data.length === 1) {
        document.getElementById('sponsor_name').textContent = response.data[0].user_id + ' - ' + response.data[0].name
        document.getElementById('sponsor_name').style.display = 'block'
        this.sponsor_id = response.data[0].user_id;
        document.getElementById('registerBtn').removeAttribute('disabled');
      } else {
        document.getElementById('sponsor_name').textContent = 'No user found with given sponsor id!'
        document.getElementById('sponsor_name').style.display = 'block'
        document.getElementById('registerBtn').setAttribute('disabled', 'disabled');
      }
    }, error => {
      console.error(error);
    });
  }
}
