import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'DepositHistory',
  templateUrl: './deposithistory.component.html',
  styleUrls: ['./deposithistory.component.css']
})
export class DeposithistoryComponent implements OnInit {
  user: any;
  transactions: any[];

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    this.loadDepositRequests();
  }

  loadDepositRequests() {
    var param = {
      "param": {
        "user_id": this.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetDepositRequests', param).subscribe(response => {
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
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/DeleteDepositRequest', param).subscribe(response => {
        alert(response.message);
        this.loadDepositRequests();
      }, error => {
        console.error(error);
        this.loadDepositRequests();
      });
    }
  }
}
