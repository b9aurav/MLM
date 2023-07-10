import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'PayoutHistory',
  templateUrl: './payouthistory.component.html',
  styleUrls: ['./payouthistory.component.css']
})
export class PayouthistoryComponent implements OnInit {
  transactions: any[];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.loadTransactions();
    }
  }

  loadTransactions() {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetWithdrawRequests', param).subscribe(response => {
      this.transactions = response.data;
    }, error => {
      console.error(error);
    });
  }

  showDeletePopup(request_id) {
    let result = confirm("Are you sure want to delete this request?");
    if (result) {
      var param = {
        "param": {
          "request_id": request_id
        } 
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/DeleteWithdrawRequest', param).subscribe(response => {
        alert(response.message);
        this.loadTransactions();
      }, error => {
        console.error(error);
        this.loadTransactions();
      });
    }
  }
}
