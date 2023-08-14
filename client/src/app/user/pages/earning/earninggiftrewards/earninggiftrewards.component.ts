import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'EarningGiftRewards',
  templateUrl: './earninggiftrewards.component.html',
  styleUrls: ['./earninggiftrewards.component.css']
})
export class EarninggiftrewardsComponent implements OnInit {
  rows: any[];

  levelSettings = {
    hideSubHeader: true,
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      members: {
        title: 'Members Required'
      },
      ranking: {
        title: 'Ranking'
      },
      gift_rewards: {
        title: 'Gift Rewards'
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell) => {
          return cell ? 'Achieved' : 'Not Achieved';
        }
      }
    },
    pager: {
      perPage: 15,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    editable: false,
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

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
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetGiftRewards', param).subscribe(response => {
      this.rows = response.data
    }, error => {
      console.error(error);
    });
  }

}
