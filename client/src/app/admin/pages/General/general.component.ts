import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'general-cmp',
    moduleId: module.id,
    templateUrl: 'general.component.html'
})

export class GeneralComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      var types = ['web_news', 'web_popup', 'user_popup'];
      var elements = {
        'web_news': {
          'checkbox': 'web_news_checkbox',
          'text': 'web-news-input'
        }, 
        'web_popup': {
          'checkbox': 'web_popup_checkbox',
          'text': 'web-popup-message'
        }, 
        'user_popup': {
          'checkbox': 'portal_popup_checkbox',
          'text': 'user-popup-message'
        }
      };
      types.forEach(type => {
        var param = {
          "param": {
            "type": type
          }
        }
        this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetGeneralSettings', param).subscribe(response => {
          var checkbox = document.getElementById(elements[type]['checkbox']) as HTMLInputElement;
          checkbox.checked = response.data[0].status;
          var textbox = document.getElementById(elements[type]['text']) as HTMLInputElement;
          textbox.value = response.data[0].message;
        }, error => {
          console.error(error);
        });
      });
    }
  }

  updateSettings(type, messageElement, statusElement) {
    var status = document.getElementById(statusElement) as HTMLInputElement
    var message = document.getElementById(messageElement) as HTMLInputElement
    var param = {
      "param": {
        "type": type,
        "message": message.value,
        "status": status.checked
      }
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/UpdateGeneralSettings', param).subscribe(response => {
      alert(response.data[0][""]);
    }, error => {
      console.error(error);
    });
  }

  onCheck(e) {
    if (!e.target.checked) {
      e.target.parentElement.parentElement.nextSibling.children[0].children[1].setAttribute('disabled', 'true');
    } else {
      e.target.parentElement.parentElement.nextSibling.children[0].children[1].removeAttribute('disabled');  
    }
  }
}
