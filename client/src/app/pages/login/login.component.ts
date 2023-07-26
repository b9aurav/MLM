import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  showPassword: boolean;
  password: string;
  usernameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;

  constructor(private router: Router, private authService: AuthService) {
    this.showPassword = false;
    this.password = ""
  }

  ngOnInit(): void {
    this.usernameInput = document.getElementById("username") as HTMLInputElement;
    this.passwordInput = document.getElementById("password") as HTMLInputElement;
  }

  hideMessage() {
    document.getElementById('messagebox').style.display = 'none'
  }

  showMessage(message) {
    document.getElementById('message').innerText = message
    document.getElementById('messagebox').style.display = 'block'
  }

  validateUser() {
    this.usernameInput = document.getElementById("username") as HTMLInputElement;
    this.passwordInput = document.getElementById("password") as HTMLInputElement;
    var param = {
      "param": {
        "username": this.usernameInput.value,
        "password": this.passwordInput.value
      }
    }

    this.authService.login(param)
      .then((value) => {
        if (value.isAdmin && value.isAuthenticated) {
          this.router.navigate(['/admin-dashboard']);
          this.authService.startTokenExpirationTimer();
        } else if (!value.isAdmin && value.isAuthenticated) {
          this.router.navigate(['/dashboard']);
          this.authService.startTokenExpirationTimer();
        } else {
          this.showMessage('Error : Invalid username or password!');
        }
      })
      .catch(error => console.error(error));
  }

  redirectRegistration() {
    this.router.navigate(['/registration']);
  }
}
