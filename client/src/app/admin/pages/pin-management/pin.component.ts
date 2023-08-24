import { Component } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'pin-cmp',
    moduleId: module.id,
    templateUrl: 'pin.component.html'
})

export class PinManagementComponent {
  selectedMenu = 'Generate Pins';

  menuItems = [
    {
      name: 'Generate Pins',
      active: 'active'
    },
    { name: 'Manage Pins' },
    { name: 'Used Pins' },
    { name: 'Pin Requests' },
    { name: 'Request History' }
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
}
