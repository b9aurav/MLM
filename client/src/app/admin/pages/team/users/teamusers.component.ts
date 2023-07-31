import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'TeamUsers',
  templateUrl: './teamusers.component.html',
  styleUrls: ['./teamusers.component.css'],
})

export class TeamUsersComponent implements OnInit {
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

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private selectedUser: UserService) {
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

  getUsers() {
    this.http.post<{ data: any, count: string, message: string }>(environment.apiBaseUrl + '/api/GetUsers', null).subscribe(response => {
      this.users = response.data;
    }, error => {
      console.error(error);
    });
  }

  onView(event) {
    console.log(event);
    this.showDetailsPopup(null)
  }

  showDetailsPopup(user_id: number) {
    document.getElementById('userModal').style.display = 'block'
    document.getElementById('userModal').classList.add('show')
    $('#userModal').on('show.bs.modal', function (event) {
      // var button = $(event.relatedTarget) // Button that triggered the modal
      // var recipient = button.data('whatever') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      // var modal = $(this)
      // modal.find('.modal-title').text('New message to ' + recipient)
      // modal.find('.modal-body input').val(recipient)
    })
    // $('.ui.modal.user-details').modal({
    //   closable: false, 
    // }).modal('show');
    this.selectedUser.user.next(user_id);
    $('.ui.dimmer').addClass('inverted');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(0.5)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(0.5)' })
    $('.nav').css({ 'filter': 'opacity(0.5)', 'pointer-events': 'none' })
  }

  hidePopup() {
    this.selectedUser.user.next(null);
    $('.ui.modal.user-details').modal('hide');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(1)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(1)' })
    $('.nav').css({ 'filter': 'opacity(1)', 'pointer-events': 'auto' })
  }
}
