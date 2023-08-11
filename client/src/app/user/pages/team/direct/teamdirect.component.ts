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
  settings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      index: {
        title: '#',
        width: '30px',
        type: 'text',
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
        filter: false
      },
      user_id: {
        title: 'ID',
        width: '80px'
      },
      name: {
        title: 'Name'
      },
      username: {
        title: 'Username'
      },
      email: {
        title: 'E-Mail'
      },
      join_date: {
        title: 'Joining Date',
        width: '40px'
      },
      sponsor_id: {
        title: 'Sponsor',
        width: '80px'
      }
    },
    pager: {
      perPage: 15,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    editable: false,
    noDataMessage: 'No members available.',
  };

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
