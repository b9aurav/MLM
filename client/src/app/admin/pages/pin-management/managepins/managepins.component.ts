import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'ManagePins',
  templateUrl: './managepins.component.html',
  styleUrls: ['./managepins.component.css']
})
export class ManagePinsComponent implements OnInit {
  pins: any[];

  unusedPinSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      Pin: {
        title: 'Pin',
      },
      "Generated For": {
        title: 'Generated For',
      },
      "Generated On": {
        title: 'Generated On',
      },
      Usable: {
        title: 'Usable',
        type: 'html',
        valuePrepareFunction: (cell) => {
          return cell ? 'Yes' : 'No';
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
      actions: {
        title: 'Action',
        filter: false,
        type: 'custom',
        width: '80px',
        renderComponent: TableButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.rowData = instance.row;
          instance.hidable = false;
          instance.buttonText = 'Toggle'
          instance.onClick.subscribe(() => {
            this.togglePin(instance.rowData.Pin);
          })
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

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.getUnusedPins();
    }
  }

  getUnusedPins() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUnusedPins', null).subscribe(response => {
      this.pins = response.data;
    }, error => {
      console.error(error);
    });
  }

  togglePin(pin) {
    var param = {
      "param": {
        "pin": pin
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/TogglePin', param).subscribe(response => {
      alert(response.message);
      this.getUnusedPins();
    }, error => {
      console.error(error);
    });
  }
}
