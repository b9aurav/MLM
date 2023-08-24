import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPinRequestComponent } from './historyrequest.component';

describe('PayouthistoryComponent', () => {
  let component: HistoryPinRequestComponent;
  let fixture: ComponentFixture<HistoryPinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPinRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
