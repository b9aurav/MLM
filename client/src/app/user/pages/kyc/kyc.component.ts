import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'kyc-cmp',
    moduleId: module.id,
    templateUrl: 'kyc.component.html'
})

export class KYCComponent implements OnInit, AfterViewInit {
  isUserActive: boolean
  bankACNoInput: HTMLInputElement;
  bankACHolderInput: HTMLInputElement;
  bankNameInput: HTMLInputElement;
  bankBranchInput: HTMLInputElement;
  bankIFSCInput: HTMLInputElement;
  aadharNoInput: HTMLInputElement;
  panNoInput: HTMLInputElement;
  photoFile: HTMLInputElement;
  signatureFile: HTMLInputElement;
  panFile: HTMLInputElement;
  aadharFile: HTMLInputElement;
  aadharBack: HTMLInputElement;
  passbookFile: HTMLInputElement;
  kycForm: HTMLFormElement;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      var param = {
        "param": {
          "user_id": this.authService.userData.user_id
        }
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetailsForAdmin', param).subscribe(response => {
        this.isUserActive = response.data[0].activate_kyc
      }, error => {
        console.error(error);
      });
    }
  }

  ngAfterViewInit(): void {
    if (!this.isUserActive) {
      this.kycForm = document.getElementById('kyc-form') as HTMLFormElement;
      $('input[type="file"]').on('change', function () {
        const inputElement = this as HTMLInputElement;
        if (typeof inputElement.files[0] !== 'undefined') {
          const maxSize = parseInt($(inputElement).attr('data-max-size'), 10);
          const size = inputElement.files[0].size;
          const isOk = maxSize > size;
          if (!isOk) {
            alert('Error : File size should be less than 500 kb!')
          } else {
            var fileName = ($(this).val() as string).split("\\").pop(); 
            $(this).prev('input[type="text"]').val(fileName);
          }
        }
      });
    }
  }

  KYCRequest() {
    this.bankACNoInput = document.getElementById("bank-ac-no-input") as HTMLInputElement;
    this.bankACHolderInput = document.getElementById("bank-ac-holder-input") as HTMLInputElement;
    this.bankNameInput = document.getElementById("bank-name-input") as HTMLInputElement;
    this.bankBranchInput = document.getElementById("bank-branch-input") as HTMLInputElement;
    this.bankIFSCInput = document.getElementById("bank-ifsc-input") as HTMLInputElement;
    this.aadharNoInput = document.getElementById("aadhar-no-input") as HTMLInputElement;
    this.panNoInput = document.getElementById("pan-no-input") as HTMLInputElement;
    this.photoFile = document.getElementById("photo-file") as HTMLInputElement;
    this.signatureFile = document.getElementById("signature-file") as HTMLInputElement;
    this.panFile = document.getElementById("pan-input-file") as HTMLInputElement;
    this.aadharFile = document.getElementById("aadhar-input-file") as HTMLInputElement;
    this.aadharBack = document.getElementById("aadhar-input-back-file") as HTMLInputElement;
    this.passbookFile = document.getElementById("passbook-input-file") as HTMLInputElement;

    if (this.bankACNoInput.value == '' ||
      this.bankACHolderInput.value == '' ||
      this.bankIFSCInput.value == '' ||
      this.bankNameInput.value == '' ||
      this.bankBranchInput.value == '' ||
      this.bankACNoInput.value == '' ||
      this.panNoInput.value == '' ||
      this.aadharNoInput.value == '') {
      alert('Error : Enter required details!')
      return;
    }

    try {
      const formData = new FormData();

      var filename = this.photoFile.files[0].name;
      var parts = filename.split('.');
      var fileExtension = parts[parts.length - 1].toLowerCase();
      formData.append("files", this.photoFile.files[0], 'Photo.' + fileExtension);

      filename = this.signatureFile.files[0].name;
      parts = filename.split('.');
      fileExtension = parts[parts.length - 1].toLowerCase();
      formData.append("files", this.signatureFile.files[0], 'Signature.' + fileExtension);
      
      filename = this.panFile.files[0].name;
      parts = filename.split('.');
      fileExtension = parts[parts.length - 1].toLowerCase();
      formData.append("files", this.panFile.files[0], 'Pancard.' + fileExtension);
      
      filename = this.aadharFile.files[0].name;
      parts = filename.split('.');
      fileExtension = parts[parts.length - 1].toLowerCase();
      formData.append("files", this.aadharFile.files[0], 'Aadharcard-front.' + fileExtension);
      
      filename = this.aadharBack.files[0].name;
      parts = filename.split('.');
      fileExtension = parts[parts.length - 1].toLowerCase();
      formData.append("files", this.aadharBack.files[0], 'Aadharcard-back.' + fileExtension);
      
      filename = this.passbookFile.files[0].name;
      parts = filename.split('.');
      fileExtension = parts[parts.length - 1].toLowerCase();
      formData.append("files", this.passbookFile.files[0], 'Passbook.' + fileExtension)
  
      var param = {
          "userid": this.authService.userData.user_id,
          "bank_ac_holder_name": this.bankACHolderInput.value,
          "ifsc": this.bankIFSCInput.value,
          "bank_name": this.bankNameInput.value,
          "branch": this.bankBranchInput.value,
          "ac_no": this.bankACNoInput.value,
          "pan_no": this.panNoInput.value,
          "aadhar_no": this.aadharNoInput.value
        } 
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/KYCRequest', formData, { params: param }).subscribe(response => {
        alert(response.message);
        document.getElementsByTagName('form')[0].reset();
      }, error => {
        console.error(error);
        document.getElementsByTagName('form')[0].reset();
      });
    } catch (error) {
      alert('Error : Upload required documents!');
    }
  }
}
