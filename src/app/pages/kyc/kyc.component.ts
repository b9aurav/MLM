import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'kyc-cmp',
    moduleId: module.id,
    templateUrl: 'kyc.component.html'
})

export class KYCComponent {

  ngOnInit() {
    $('input[type="file"]').on('change', function () {
      var fileName = $(this).val().split("\\").pop();
      $(this).prev('input[type="text"]').val(fileName);
    });
  }

}
