import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinrequesthistoryComponent } from './pinrequesthistory.component';

describe('DeposithistoryComponent', () => {
  let component: PinrequesthistoryComponent;
  let fixture: ComponentFixture<PinrequesthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinrequesthistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinrequesthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
