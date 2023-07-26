import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningdirectComponent } from './earningdirect.component';

describe('EarningdirectComponent', () => {
  let component: EarningdirectComponent;
  let fixture: ComponentFixture<EarningdirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningdirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningdirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
