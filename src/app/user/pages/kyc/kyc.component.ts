import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../services/user.service'
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'kyc-cmp',
    moduleId: module.id,
    templateUrl: 'kyc.component.html'
})

export class KYCComponent implements OnInit {
  user: any;
  bankACNoInput: HTMLInputElement;
  bankACHolderInput: HTMLInputElement;
  bankNameInput: HTMLInputElement;
  bankBranchInput: HTMLInputElement;
  bankIFSCInput: HTMLInputElement;
  aadharNoInput: HTMLInputElement;
  panNoInput: HTMLInputElement;

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit() {
    $('input[type="file"]').on('change', function () {
      var fileName = ($(this).val() as string).split("\\").pop();
      $(this).prev('input[type="text"]').val(fileName);
    });
  }

  KYCRequest() {
    this.bankACNoInput = document.getElementById("bank-ac-no-input") as HTMLInputElement;
    this.bankACHolderInput = document.getElementById("bank-ac-holder-input") as HTMLInputElement;
    this.bankNameInput = document.getElementById("bank-name-input") as HTMLInputElement;
    this.bankBranchInput = document.getElementById("bank-branch-input") as HTMLInputElement;
    this.bankIFSCInput = document.getElementById("bank-ifsc-input") as HTMLInputElement;
    this.aadharNoInput = document.getElementById("aadhar-no-input") as HTMLInputElement;
    this.panNoInput = document.getElementById("pan-no-input") as HTMLInputElement;
    var param = {
      "param": {
        "userid": this.user.user_id,
        "bank_ac_holder_name": this.bankACHolderInput.value,
        "ifsc": this.bankIFSCInput.value,
        "bank_name": this.bankNameInput.value,
        "branch": this.bankBranchInput.value,
        "ac_no": this.bankACNoInput.value,
        "pan_no": this.panNoInput.value,
        "aadhar_no": this.aadharNoInput.value
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/KYCRequest', param).subscribe(response => {
      alert(response.message);
      document.getElementsByTagName('form')[0].reset();
    }, error => {
      console.error(error);
      document.getElementsByTagName('form')[0].reset();
    });
  }
}
