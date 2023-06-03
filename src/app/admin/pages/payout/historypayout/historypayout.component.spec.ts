import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorypayoutComponent } from './historypayout.component';

describe('PayouthistoryComponent', () => {
  let component: HistorypayoutComponent;
  let fixture: ComponentFixture<HistorypayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorypayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorypayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
