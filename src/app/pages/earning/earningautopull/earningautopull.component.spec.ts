import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningautopullComponent } from './earningautopull.component';

describe('EarningautopullComponent', () => {
  let component: EarningautopullComponent;
  let fixture: ComponentFixture<EarningautopullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningautopullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningautopullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
