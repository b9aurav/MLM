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
  pinInput: HTMLInputElement;
  sponsor_id: string;

  constructor(private http: HttpClient, private router: Router) {
    this.showPassword = false;
    this.password = "" 
  }

  ngOnInit(): void {
    this.pinInput = document.getElementById('pin') as HTMLInputElement;
  }

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
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    this.usernameInput = document.getElementById("username") as HTMLInputElement;
    this.passwordInput = document.getElementById("password") as HTMLInputElement;
    this.nameInput = document.getElementById("name") as HTMLInputElement;
    this.emailInput = document.getElementById("email") as HTMLInputElement;
    this.phoneInput = document.getElementById("phone") as HTMLInputElement;
    this.sponsorInput = document.getElementById("sponsor") as HTMLInputElement;
    if (this.sponsorInput.value == '' ||
        this.usernameInput.value == '' ||
        this.passwordInput.value == '' ||
        this.nameInput.value == '' ||
        this.emailInput.value == '' ||
        this.phoneInput.value == '') {
      this.showMessage('Error : Enter required details!')
      return;
    }
    if (this.sponsor_id == null || !emailPattern.test(this.emailInput.value)) {
      this.showMessage('Error : Enter Valid Details!');
      return;
    }
    var param = {
      "param": {
        "name": this.nameInput.value,
        "email": this.emailInput.value,
        "phone": this.phoneInput.value,
        "sponsor_id": this.sponsor_id,
        "username": this.usernameInput.value,
        "password": this.passwordInput.value,
        "pin": this.pinInput.value
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/AddUser', param).subscribe(response => {
      this.showMessage(response.message)
      if (response.message.startsWith('Info  : New user created')) {
        document.getElementsByTagName('form')[0].reset();
        document.getElementById('sponsor_name').style.display = 'none'
        document.getElementById('pin_msg').style.display = 'none'
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
        var sponsor = response.data[0];
        var param = {
          "param": {
            "user_id": sponsor.user_id
          } 
        }
        this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetDirectTeam', param).subscribe(response => {
          if (response.data.length >= 10) {
            document.getElementById('sponsor_name').textContent = 'Sponsor has already achieved direct members limit!'
            document.getElementById('sponsor_name').style.display = 'block'
            document.getElementById('sponsor_name').style.backgroundColor = 'indianred'
          } else {
            document.getElementById('sponsor_name').textContent = sponsor.user_id + ' - ' + sponsor.name
            document.getElementById('sponsor_name').style.display = 'block'
            document.getElementById('sponsor_name').style.backgroundColor = 'seagreen'
            this.sponsor_id = sponsor.user_id;
          }
        }, error => {
          console.error(error);
        });
      } else {
        document.getElementById('sponsor_name').textContent = 'No user found with given sponsor id!'
        document.getElementById('sponsor_name').style.display = 'block'
        document.getElementById('sponsor_name').style.backgroundColor = 'indianred'
      }
    }, error => {
      console.error(error);
    });
  }

  validatePin() {
    var pin = document.getElementById('pin') as HTMLInputElement
    var param = {
      "param": {
        "pin": pin.value
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/ValidatePin', param).subscribe(response => {
      document.getElementById('pin_msg').textContent = response.message;
      document.getElementById('pin_msg').style.display = 'block'
      if (response.message === 'Info  : Pin is valid.') {
        document.getElementById('pin_msg').style.backgroundColor = 'seagreen'
        document.getElementById('registerBtn').removeAttribute('disabled');
      } else {
        document.getElementById('pin_msg').style.backgroundColor = 'indianred'
        document.getElementById('registerBtn').setAttribute('disabled', 'disabled');
      }
    }, error => {
      console.error(error);
    });
  }

  formatPin() {
    const formattedValue = this.pinInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  
    // Limit the formatted value to 19 characters
    const maxLength = 19;
    const parts = formattedValue.match(/.{1,4}/g);
    const truncatedValue = parts ? parts.slice(0, 4).join('-') : '';
  
    this.pinInput.value = truncatedValue;
  }
  
  onKeyDown(event: KeyboardEvent) {
    // Handle backspace key (8) to remove the last character or hyphen
    if (event.keyCode === 8 && this.pinInput.value) {
      const lastChar = this.pinInput.value.charAt(this.pinInput.value.length - 1);
      if (lastChar === '-') {
        this.pinInput.value = this.pinInput.value.slice(0, -1); // Remove the last hyphen
      } else {
        this.pinInput.value = this.pinInput.value.slice(0, -1); // Remove the last character
        this.formatPin(); // Reformat the key without the removed character
      }
    }
  }
  
}
