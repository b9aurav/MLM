import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPinsComponent } from './mypins.component';

describe('MyPinsComponent', () => {
  let component: MyPinsComponent;
  let fixture: ComponentFixture<MyPinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
