import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { UserService } from './user.service';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';
import { EarningComponent } from './earning/earning.component';

@Component({
  selector: 'TeamUsers',
  templateUrl: './teamusers.component.html',
  styleUrls: ['./teamusers.component.css'],
})

export class TeamUsersComponent implements OnInit, OnDestroy {
  @ViewChild('childContainer', { read: ViewContainerRef, static: false }) childContainer: ViewContainerRef;
  childComponentRef: ComponentRef<EarningComponent>;

  users: any[];
  selectedUserId: number;
  settings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      user_id: {
        title: 'ID',
        width: '80px'
      },
      username: {
        title: 'Username'
      },
      name: {
        title: 'Name'
      },
      sponsor_id: {
        title: 'Sponsor',
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
      action: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        width: '80px',
        renderComponent: TableButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.buttonText = 'Details';
          instance.rowData = instance.row;
          instance.hidable = false;
          instance.onClick.subscribe(() => {
            this.showDetailsPopup(instance.rowData);
          })
        },
      }
    },
    pager: {
      perPage: 15,
    },
    actions: {
      width: '20px',
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    },
    editable: false,
    noDataMessage: 'No users available.',
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private selectedUser: UserService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.users = [];
    this.selectedUser.user.subscribe(value => {
      this.selectedUserId = value;
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.getUsers()
    }
  }

  ngOnDestroy() {
    this.destroyChildComponent();
  }

  getUsers() {
    this.http.post<{ data: any, count: string, message: string }>(environment.apiBaseUrl + '/api/GetUsers', null).subscribe(response => {
      this.users = response.data;
    }, error => {
      console.error(error);
    });
  }

  showDetailsPopup(user) {
    this.selectedUser.user.next(user.user_id);
    this.createChildComponent();
    $('.ui.modal.user-details').modal('refresh');
  }

  hidePopup() {
    this.selectedUser.user.next(null);
    $('.ui.modal.user-details').modal('hide');
    $('.ui.modal.user-details').modal('destroy');
    this.destroyChildComponent();
    this.ngOnInit();
  }

  private createChildComponent() {
    this.destroyChildComponent();

    const childComponentFactory = this.componentFactoryResolver.resolveComponentFactory(EarningComponent);
    this.childComponentRef = this.childContainer.createComponent(childComponentFactory);

    $('.ui.modal.user-details').modal({
      closable: false,
    }).modal('show');
  }

  private destroyChildComponent() {
    if (this.childComponentRef) {
      this.childComponentRef.destroy();
    }
  }
}
