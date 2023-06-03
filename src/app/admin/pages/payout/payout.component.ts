import { Component } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'payout-cmp',
    moduleId: module.id,
    templateUrl: 'payout.component.html'
})

export class PayoutComponent {
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
