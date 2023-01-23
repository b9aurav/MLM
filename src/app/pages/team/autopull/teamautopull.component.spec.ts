import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelautopullComponent } from './levelautopull.component';

describe('LevelautopullComponent', () => {
  let component: LevelautopullComponent;
  let fixture: ComponentFixture<LevelautopullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelautopullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelautopullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
