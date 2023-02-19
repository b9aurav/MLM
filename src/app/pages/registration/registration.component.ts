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

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
    this.showPassword = false;
    this.password = "" 
  }

  ngOnInit(): void {
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
}
