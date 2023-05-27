import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    var param = {
      "param": {
        "username": localStorage.getItem('mlm_user')
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetails', param).subscribe(response => {
      this.userService.setUser(response.data[0]);
      let userLabel = document.getElementById("userLabel") as HTMLLabelElement;
      userLabel.innerText = this.userService.user.name
      let nameInput = document.getElementById("nameInput") as HTMLInputElement;
      nameInput.value = this.userService.user.name
      let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
      usernameInput.value = this.userService.user.username
      let useridInput = document.getElementById("useridInput") as HTMLInputElement;
      useridInput.value = this.userService.user.user_id
      let sponsorInput = document.getElementById("sponsorInput") as HTMLInputElement;
      sponsorInput.value = this.userService.user.sponsor_id
      let phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
      phoneInput.value = this.userService.user.phone
      let emailInput = document.getElementById("emailInput") as HTMLInputElement;
      emailInput.value = this.userService.user.email
      let activeInput = document.getElementById("activeInput") as HTMLInputElement;
      if (this.userService.user.is_active) {
        activeInput.value = 'Active'
        let activedateInput = document.getElementById("activedateInput") as HTMLInputElement;
        activedateInput.value = this.userService.user.activation_date.split('T')[0]  
      } else {
        activeInput.value = 'In-Active'
      }
      let joindateInput = document.getElementById("joindateInput") as HTMLInputElement;
      joindateInput.value = this.userService.user.join_date.split('T')[0]
    }, error => console.error(error));
  }
}
