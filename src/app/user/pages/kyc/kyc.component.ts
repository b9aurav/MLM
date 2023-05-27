import { Component } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../services/user.service'

import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'kyc-cmp',
    moduleId: module.id,
    templateUrl: 'kyc.component.html'
})

export class KYCComponent {
  user: any;

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit() {
    $('input[type="file"]').on('change', function () {
      var fileName = ($(this).val() as string).split("\\").pop();
      $(this).prev('input[type="text"]').val(fileName);
    });
  }

}
