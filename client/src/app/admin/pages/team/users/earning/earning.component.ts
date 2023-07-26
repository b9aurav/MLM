import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EarningdirectComponent } from './earningdirect/earningdirect.component';

@Component({
  selector: 'earning-cmp',
  moduleId: module.id,
  templateUrl: 'earning.component.html',
})

export class EarningComponent implements OnInit {
  selectedMenu = 'Personal';
  ngOnInit(): void { }

  menuItems = [
    {
      name: 'Personal',
      active: 'active'
    },
    { name: 'Direct Members' },
    { name: 'Level Members' },
    { name: 'Autopool Info' },
    { name: 'Education & Tour' },
    { name: 'Gifts & Rewards' }
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
}
