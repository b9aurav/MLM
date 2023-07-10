import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      var param = {
        "param": {
          "username": localStorage.getItem('mlm_user')
        } 
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetails', param).subscribe(response => {
        let userLabel = document.getElementById("userLabel") as HTMLLabelElement;
        userLabel.innerText = this.authService.userData.name
        let nameInput = document.getElementById("nameInput") as HTMLInputElement;
        nameInput.value = this.authService.userData.name
        let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
        usernameInput.value = this.authService.userData.username
        let useridInput = document.getElementById("useridInput") as HTMLInputElement;
        useridInput.value = this.authService.userData.user_id
        let sponsorInput = document.getElementById("sponsorInput") as HTMLInputElement;
        sponsorInput.value = this.authService.userData.sponsor_id
        let phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
        phoneInput.value = this.authService.userData.phone
        let emailInput = document.getElementById("emailInput") as HTMLInputElement;
        emailInput.value = this.authService.userData.email
        let activeInput = document.getElementById("activeInput") as HTMLInputElement;
        let joindateInput = document.getElementById("joindateInput") as HTMLInputElement;
        joindateInput.value = this.authService.userData.join_date.split('T')[0]
        if (this.authService.userData.is_active) {
          activeInput.value = 'Active'
          let activedateInput = document.getElementById("activedateInput") as HTMLInputElement;
          activedateInput.value = this.authService.userData.activation_date.split('T')[0]  
        } else {
          activeInput.value = 'In-Active'
        }
      }, error => console.error(error));
    }
  }
}
