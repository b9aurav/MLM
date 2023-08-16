import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'report-cmp',
    moduleId: module.id,
    templateUrl: 'report.component.html'
})

export class ReportComponent {
  selectedMenu = 'Export';

  menuItems = [
    {
      name: 'Export',
      active: 'active'
    },
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
}
