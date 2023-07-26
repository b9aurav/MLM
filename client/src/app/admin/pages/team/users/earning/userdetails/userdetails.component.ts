import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'UserDetails',
  templateUrl: './Userdetails.component.html',
  styleUrls: ['./Userdetails.component.css']
})
export class UserDetails implements OnInit {
  rows: any[];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      setTimeout(() => {
        // this.getAutopoolEarnings();
      }, 100);
    }
  }

  // getAutopoolEarnings() {
  //   var param = {
  //     "param": {
  //       "user_id": this.authService.userData.user_id
  //     } 
  //   }
  //   this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetAutopoolIncome', param).subscribe(response => {
  //     this.rows = response.data
  //   }, error => {
  //     console.error(error);
  //   });
  // }

}
