import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingkycComponent } from './pendingkyc.component';

describe('SupportticketComponent', () => {
  let component: PendingkycComponent;
  let fixture: ComponentFixture<PendingkycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingkycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingkycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
