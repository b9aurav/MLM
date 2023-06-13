import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'HistoryDeposit',
  templateUrl: './historydeposit.component.html',
  styleUrls: ['./historydeposit.component.css']
})
export class HistorydepositComponent implements OnInit {
  user: any;
  requests: any[];

  constructor(private userService: UserService,  private http: HttpClient) { }

  ngOnInit(): void {
    this.loadRespondedRequests();
  }

  loadRespondedRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetRespondedDepositRequests', null).subscribe(response => {
      this.requests = response.data;
    }, error => {
      console.error(error);
    });
  }
}
