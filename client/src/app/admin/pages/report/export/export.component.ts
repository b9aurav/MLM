import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ExportExcelService } from 'app/services/export-excel.service';

@Component({
  selector: 'ExportReport',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})

export class ExportReportComponent {
  data: any[];
  fromPicker: HTMLInputElement;
  toPicker: HTMLInputElement;
  fromDate: string;
  toDate: string;
  excelData: any[] = [];
  total: number;
  gst: number;
  admin: number;
  tds: number;
  earnings: number;
  digitalToken: number;
  availableBal: number;
  withdrawedBal: number;
  gstCheckbox: HTMLInputElement;
  tdsCheckbox: HTMLInputElement;
  adminCheckbox: HTMLInputElement;
  digitalTokenCheckbox: HTMLInputElement;
  earningsCheckbox: HTMLInputElement;
  availableBalCheckbox: HTMLInputElement;
  withdrawedBalCheckbox: HTMLInputElement;
  dataFetched: boolean = false;

  settings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      "User ID": {
        title: 'ID'
      },
      "Name": {
        title: 'Name',
        width: '30%'
      },
      "Registered On": {
        title: 'Registered On',
      },
      Amount: {
        title: 'Amount',
        filter: false,
      },
      GST: {
        title: 'GST',
        filter: false,
      },
      "User Earnings": {
        title: 'Earnings',
        filter: false
      },
      Admin: {
        title: 'Admin (10%)',
        filter: false
      },
      TDS: {
        title: 'TDS (5%)',
        filter: false
      },
      "Digital Token": {
        title: 'Digital Token (10%)',
        filter: false
      },
      "Withdrawal Balance": {
        title: 'Withdrawal Balance',
        filter: false
      },
      "Available Balance": {
        title: 'Available Balance',
        filter: false
      }
    },
    pager: {
      perPage: 10,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    editable: false,
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private excelService: ExportExcelService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.fromPicker = document.getElementById('fromPicker') as HTMLInputElement;
      this.fromPicker.max = new Date().toLocaleDateString('fr-ca');
      this.toPicker = document.getElementById('toPicker') as HTMLInputElement;
      this.toPicker.max = new Date().toLocaleDateString('fr-ca');
    }
  }

  generateReport() {
    if (this.fromPicker.value != '' && this.toPicker.value != '') {
      var param = {
        "param": {
          "from": this.fromPicker.value,
          "to": this.toPicker.value,
        }
      }
      this.http.post<{ data: any, total: number, admin: number, tds: number, gst: number, digitalToken: number, userEarnings: number, available_bal: number, withdrawed_bal: number, message: string }>(environment.apiBaseUrl + '/api/GetReportData', param).subscribe(response => {
        this.data = response.data;
        this.total = response.total;
        this.gst = response.gst;
        this.admin = response.admin;
        this.tds = response.tds;
        this.digitalToken = response.digitalToken;
        this.earnings = response.userEarnings;
        this.availableBal = response.available_bal;
        this.withdrawedBal = response.withdrawed_bal;
        this.dataFetched = true;
        setTimeout(() => {
          document.getElementById('GSTLabel').textContent = 'Rs. ' + response.gst.toString() + ' (18%)'
          document.getElementById('TDSLabel').textContent = 'Rs. ' + response.tds.toString() + ' (5%)'
          document.getElementById('adminLabel').textContent = 'Rs. ' + response.admin.toString() + ' (10%)'
          document.getElementById('totalamountLabel').textContent = 'Rs. ' + response.total.toString() + ' (100%)'
          document.getElementById('digitalTokenLabel'). textContent = 'Rs. ' + response.digitalToken.toString() + ' (10%)'
          document.getElementById('userEarningsLabel'). textContent = 'Rs. ' + response.userEarnings.toString()
          document.getElementById('availablebalLabel').textContent = 'Rs. ' + response.available_bal.toString()
          document.getElementById('WithdrawedbalLabel').textContent = 'Rs. ' + response.withdrawed_bal.toString()
        }, 100);
        this.fromDate = this.fromPicker.value
        this.toDate = this.toPicker.value
      }, error => {
        console.error(error);
      });
    } else {
      alert('Error : Select Date!')
    }
  }

  exportToExcel() {
    this.data.forEach((row: any) => {
      this.excelData.push(Object.values(row))
    })
    let reportData = {
      title: this.fromDate + ' - ' + this.toDate + ' Report (Physics Marketing)',
      data: this.excelData,
      headers: Object.keys(this.data[0])
    }
    var gstAmt, tdsAmt, adminAmt, digitalTokenAmt, earnings, available, withdrawed;
    this.adminCheckbox = document.getElementById('adminCheckbox') as HTMLInputElement;
    this.tdsCheckbox = document.getElementById('tdsCheckbox') as HTMLInputElement;
    this.gstCheckbox = document.getElementById('gstCheckbox') as HTMLInputElement;
    this.digitalTokenCheckbox = document.getElementById('DigitalTokenCheckbox') as HTMLInputElement;
    this.earningsCheckbox = document.getElementById('earningsCheckbox') as HTMLInputElement;
    this.availableBalCheckbox = document.getElementById('AvaialbleCheckbox') as HTMLInputElement;
    this.withdrawedBalCheckbox = document.getElementById('WithdrawedCheckbox') as HTMLInputElement;
    if (this.gstCheckbox.checked) gstAmt = this.gst; else gstAmt = null
    if (this.tdsCheckbox.checked) tdsAmt = this.tds; else tdsAmt = null
    if (this.adminCheckbox.checked) adminAmt = this.admin; else adminAmt = null
    if (this.digitalTokenCheckbox.checked) digitalTokenAmt = this.digitalToken; else digitalTokenAmt = null
    if (this.earningsCheckbox.checked) earnings = this.earnings; else earnings = null
    if (this.availableBalCheckbox.checked) available = this.availableBal; else available = null
    if (this.withdrawedBalCheckbox.checked) withdrawed = this.withdrawedBal; else withdrawed = null
    this.excelService.export(reportData, this.total, gstAmt, adminAmt, tdsAmt, digitalTokenAmt, earnings, available, withdrawed);
  }
}
