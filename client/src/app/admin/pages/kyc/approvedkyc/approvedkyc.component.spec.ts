import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedkycComponent } from './approvedkyc.component';

describe('SupportticketComponent', () => {
  let component: ApprovedkycComponent;
  let fixture: ComponentFixture<ApprovedkycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedkycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedkycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
