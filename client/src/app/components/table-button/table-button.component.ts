import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.css']
})
export class TableButtonComponent {

  @Input() rowData: any;
  @Input() hidable: boolean = true;
  @Input() buttonText: string;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }

}
