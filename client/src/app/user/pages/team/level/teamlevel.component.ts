import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'TeamLevel',
  templateUrl: './teamlevel.component.html',
  styleUrls: ['./teamlevel.component.css']
})
export class TeamLevelComponent implements OnInit {
  rows: any[] = [];
  levels: number = 5;
  level_data: LocalDataSource = new LocalDataSource();
  members: any[];
  toggleTable: boolean = false;

  membersSettings = {
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
      is_active: {
        title: 'Status',
        width: '70px',
        type: 'html',
        valuePrepareFunction: (cell) => {
          return cell ? 'Active' : 'Inactive';
        },
        filter: {
          type: 'checkbox',
          config: {
            true: 'true',
            false: 'false',
            resetText: 'All',
          },
        },
      },
      activation_date: {
        title: 'Activation Date',
        width: '40px'
      },
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

  levelSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    hideSubHeader: true,
    columns: {
      level_no: {
        title: 'Level'
      },
      total_members: {
        title: 'Members'
      },
      actions: {
        title: 'Actions',
        type: 'custom',
        width: '80px',
        renderComponent: TableButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.buttonText = 'View';
          instance.hidable = false;
          instance.rowData = instance.row;
          instance.onClick.subscribe(() => this.getTeamByLevel(instance.rowData));
        },
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
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      setTimeout(() => {
        this.getLevelInfo();
      }, 100);
    }
  }

  async getLevelInfo() {
    for (let levelRow = 1; levelRow <= this.levels; levelRow++) {
      var param = {
        "param": {
          "user_id": this.authService.userData.user_id,
          "level": levelRow
        }
      }
      try {
        const response = await this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetTeamByLevel', param).toPromise()
        const data = {
          "level_no": "Level " + levelRow,
          "total_members": response.data.length
        }
        this.rows.push(data);
      } catch (error) {
        console.error(error);
      }
    }
    this.level_data.load(this.rows);
  }

  getTeamByLevel(level) {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id,
        "level": level.level_no.split(' ')[1]
      }
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetTeamByLevel', param).subscribe(response => {
      this.members = response.data;
      this.toggleTable = !this.toggleTable
    }, error => {
      console.error(error);
    });
  }
}
