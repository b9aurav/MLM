import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'TeamAutopool',
  templateUrl: './teamautopool.component.html',
  styleUrls: ['./teamautopool.component.css']
})
export class TeamAutopoolComponent implements OnInit {
  rows: any[];
  levels: number = 7;
  members: any[];
  toggleTable: boolean = false;
  searchTerm: string;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {   this.rows = [];
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      setTimeout(() => {
        this.getLevelInfo();
      }, 100);
    }
  }

  getLevelInfo() {
    for (let levelRow = 1; levelRow <= this.levels; levelRow++) {
      setTimeout(() => {
        var param = {
          "param": {
            "user_id": this.authService.userData.user_id,
            "level": levelRow
          } 
        }
        this.http.post<{ data: any, count: string, message: string }>(environment.apiBaseUrl + '/api/GetAutopoolTeamByLevel', param).subscribe(response => {
          var data = {
            "level_no": levelRow,
            "total_members": response.count
          }
          this.rows.push(data);
          this.rows.sort((a, b) => a.level_no - b.level_no);
        }, error => {
          console.error(error);
        });
      }, 100);
    }
  }

  getAutopoolTeamByLevel(level) {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id,
        "level": level
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetAutopoolTeamByLevel', param).subscribe(response => {
      this.members = response.data;  
      this.toggleTable = !this.toggleTable
    }, error => {
      console.error(error);
    });
  }
}
