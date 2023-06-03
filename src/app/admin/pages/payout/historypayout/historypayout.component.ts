import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'HistoryPayout',
  templateUrl: './historypayout.component.html',
  styleUrls: ['./historypayout.component.css']
})
export class HistorypayoutComponent implements OnInit {
  user: any;
  requests: any[];

  constructor(private userService: UserService,  private http: HttpClient) { }

  ngOnInit(): void {
    this.loadRespondedRequests();
  }

  loadRespondedRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetRespondedWithdrawRequests', null).subscribe(response => {
      this.requests = response.data;
    }, error => {
      console.error(error);
    });
  }
}
