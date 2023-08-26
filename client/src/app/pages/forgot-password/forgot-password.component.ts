import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  showPassword: boolean;
  password: string;
  usernameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  OTPInput: HTMLInputElement;
  repasswordInput: HTMLInputElement;

  validOTP: boolean = false;
  username: string = '';
  email: string = '';

  constructor(private router: Router, private http: HttpClient) {
    this.showPassword = false;
    this.password = ""
  }

  ngOnInit(): void {
    this.usernameInput = document.getElementById("username") as HTMLInputElement;
    this.passwordInput = document.getElementById("password") as HTMLInputElement;
    this.OTPInput = document.getElementById('otp') as HTMLInputElement;
    this.repasswordInput = document.getElementById('re-password') as HTMLInputElement;
  }

  hideMessage() {
    document.getElementById('messagebox').style.display = 'none'
  }

  showMessage(message) {
    document.getElementById('message').innerText = message
    document.getElementById('messagebox').style.display = 'block'
  }

  getUserEmail() {
    this.usernameInput = document.getElementById("username") as HTMLInputElement;
    var param = {
      "param": {
        "username": this.usernameInput.value,
      }
    }
    this.http.post<{ data: any }>(environment.apiBaseUrl + '/api/GetUserEmail', param).subscribe(response => {
      if (response.data.length == 1) {
        this.username = this.usernameInput.value;
        this.email = response.data[0].email;
        this.sendOTP();
        this.hideMessage();
      } else {
        this.showMessage('Error : User not found!')
      }
    }, error => {
      console.error(error);
    });
  }

  sendOTP() {
    var param = {
      "param": {
        "email": this.email,
        "username": this.username
      }
    }
    this.http.post<{ data: any }>(environment.apiBaseUrl + '/api/SendOTP', param).subscribe(response => {
      this.showMessage('Info  : OTP sent to your E-Mail Address. it will valid for 5 minutes.')
    }, error => {
      console.error(error);
    });
  }

  verifyOTP() {
    this.OTPInput = document.getElementById('otp') as HTMLInputElement;
    var param = {
      "param": {
        "username": this.username,
        "otp": this.OTPInput.value
      }
    }
    this.http.post<{ data: boolean }>(environment.apiBaseUrl + '/api/VerifyOTP', param).subscribe(response => {
      this.validOTP = response.data
      if (!this.validOTP) {
        this.showMessage('Error : Invalid OTP!')
      } else {
        this.hideMessage();
      }
    }, error => {
      console.error(error);
    });
  }

  updatePassword() {
    this.passwordInput = document.getElementById("password") as HTMLInputElement;
    this.repasswordInput = document.getElementById('re-password') as HTMLInputElement;
    if (this.passwordInput.value == this.repasswordInput.value) {
      var param = {
        "param": {
          "username": this.username,
          "password": this.passwordInput.value
        }
      }
      this.http.post<{ message: any }>(environment.apiBaseUrl + '/api/UpdatePassword', param).subscribe(response => {
        if (response.message.startsWith('Error')) {
          this.showMessage(response.message);
        } else {
          alert(response.message);
          this.router.navigate(['/login']);
        }
      }, error => {
        console.error(error);
      });
    } else {
      this.showMessage('Error : Re-typed password does not matched!')
    }
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }
}
