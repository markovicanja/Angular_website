import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementPlanComponent } from './engagement-plan.component';

describe('EngagementPlanComponent', () => {
  let component: EngagementPlanComponent;
  let fixture: ComponentFixture<EngagementPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
