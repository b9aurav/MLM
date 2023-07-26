import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'TeamDirect',
  templateUrl: './teamdirect.component.html',
  styleUrls: ['./teamdirect.component.css']
})
export class TeamDirectComponent implements OnInit {
  members: any[];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      setTimeout(() => {
        this.getDirectTeam();
      }, 100);
    }
  }

  getDirectTeam() {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetDirectTeam', param).subscribe(response => {
      this.members = response.data;
    }, error => {
      console.error(error);
    });
  }

}
