import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'HistoryDeposit',
  templateUrl: './historydeposit.component.html',
  styleUrls: ['./historydeposit.component.css']
})
export class HistorydepositComponent implements OnInit {
  requests: any[];

  constructor(private authService: AuthService,  private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.loadRespondedRequests();
    }
  }

  loadRespondedRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetRespondedDepositRequests', null).subscribe(response => {
      this.requests = response.data;
    }, error => {
      console.error(error);
    });
  }
}
