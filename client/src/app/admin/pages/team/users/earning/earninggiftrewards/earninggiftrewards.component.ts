import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'EarningGiftRewards',
  templateUrl: './earninggiftrewards.component.html',
  styleUrls: ['./earninggiftrewards.component.css']
})
export class EarninggiftrewardsComponent implements OnInit {
  rows: any[];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private selectedUser: UserService) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      setTimeout(() => {
        this.getGiftRewardsData();
      }, 100);
    }
  }

  getGiftRewardsData() {
    var param = {
      "param": {
        "user_id": this.selectedUser.getUser()
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetGiftRewards', param).subscribe(response => {
      this.rows = response.data
    }, error => {
      console.error(error);
    });
  }

}
