import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
import { AppModule } from 'app/app.module';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: any;
  showPassword:boolean;
  password: string;
  usernameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;

  constructor(private userService: UserService, private http: HttpClient, private router: Router) { 
    this.showPassword = false;
    this.password = ""
    this.user = this.userService.user
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
    var param = {
      "param": {
        "username": this.usernameInput.value,
        "password": this.passwordInput.value
      } 
    }
    this.http.post<{ data: any, message: string }>('api/ValidateUser', param).subscribe(response => {
      if (response.data[0][''] != 'Info  : Login validated') {
        this.showMessage(response.data[0]['']);
      } else {
        var param = {
          "param": {
            "username": this.usernameInput.value
          } 
        }
        this.http.post<{ data: any, message: string }>('api/GetUserDetails', param).subscribe(response => {
          this.userService.setUser(response.data[0]);
          this.router.navigate(['/dashboard']);
        }, error => console.error(error));
        
      }
    }, error => {
      console.error(error);
    });
  }
}
