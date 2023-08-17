import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementautopoolComponent } from './achievementautopool.component';

describe('AchievementautopullComponent', () => {
  let component: AchievementautopoolComponent;
  let fixture: ComponentFixture<AchievementautopoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AchievementautopoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementautopoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
