import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BachelorStudiesComponent } from './bachelor-studies.component';

describe('BachelorStudiesComponent', () => {
  let component: BachelorStudiesComponent;
  let fixture: ComponentFixture<BachelorStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BachelorStudiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BachelorStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
