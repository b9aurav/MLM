import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'TeamAutopool',
  templateUrl: './teamautopool.component.html',
  styleUrls: ['./teamautopool.component.css']
})
export class TeamAutopoolComponent implements OnInit {
  user: any;
  rows: any[];
  levels: number = 7;
  members: any[];
  toggleTable: boolean = false;
  searchTerm: string;

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
    this.rows = [];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getLevelInfo();
    }, 100);
  }

  getLevelInfo() {
    for (let levelRow = 1; levelRow <= this.levels; levelRow++) {
      setTimeout(() => {
        var param = {
          "param": {
            "user_id": this.userService.user.user_id,
            "level": levelRow
          } 
        }
        this.http.post<{ data: any, count: string, message: string }>(environment.apiBaseUrl + '/api/GetAutopoolTeamByLevel', param).subscribe(response => {
          console.log(response)
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
        "user_id": this.userService.user.user_id,
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
