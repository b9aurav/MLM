import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorydepositComponent } from './historydeposit.component';

describe('PayouthistoryComponent', () => {
  let component: HistorydepositComponent;
  let fixture: ComponentFixture<HistorydepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorydepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorydepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
