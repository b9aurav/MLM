import { Component } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'deposit-cmp',
    moduleId: module.id,
    templateUrl: 'deposit.component.html'
})

export class DepositComponent {
  selectedMenu = 'Pending';

  menuItems = [
    {
      name: 'Pending',
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
