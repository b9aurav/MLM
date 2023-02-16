import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'TeamLevel',
  templateUrl: './teamlevel.component.html',
  styleUrls: ['./teamlevel.component.css']
})
export class TeamLevelComponent implements OnInit {
  user: any;
  rows: any[];
  levels: number = 5;
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
      var param = {
        "param": {
          "user_id": this.userService.user.user_id,
          "level": levelRow
        } 
      }
      this.http.post<{ data: any, message: string }>('api/GetTeamByLevel', param).subscribe(response => {
        var data = {
          "level_no": levelRow,
          "total_members": response.data.length
        }
        this.rows.push(data);
        this.rows.sort((a, b) => a.level_no - b.level_no);
      }, error => {
        console.error(error);
      });
    }
  }

  getTeamByLevel(level) {
    var param = {
      "param": {
        "user_id": this.userService.user.user_id,
        "level": level
      } 
    }
    this.http.post<{ data: any, message: string }>('api/GetTeamByLevel', param).subscribe(response => {
      this.members = response.data;  
      this.toggleTable = !this.toggleTable
    }, error => {
      console.error(error);
    });
  }
}
