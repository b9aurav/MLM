import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePinsComponent } from './managepins.component';

describe('ManagePinsComponent', () => {
  let component: ManagePinsComponent;
  let fixture: ComponentFixture<ManagePinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
