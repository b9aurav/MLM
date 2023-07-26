import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'HistoryPayout',
  templateUrl: './historypayout.component.html',
  styleUrls: ['./historypayout.component.css']
})
export class HistorypayoutComponent implements OnInit {
  requests: any[];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.loadRespondedRequests();
    }
  }

  loadRespondedRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetRespondedWithdrawRequests', null).subscribe(response => {
      this.requests = response.data;
    }, error => {
      console.error(error);
    });
  }
}
