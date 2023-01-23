import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";


@Component({
    selector: 'deposit-cmp',
    moduleId: module.id,
    templateUrl: 'deposit.component.html'
})

export class DepositComponent {
  selectedMenu = 'Add Fund';

  menuItems = [
    {
      name: 'Add Fund',
      active: 'active'
    },
    { name: 'History' },
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
}
