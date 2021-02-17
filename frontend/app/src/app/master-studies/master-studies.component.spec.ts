import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStudiesComponent } from './master-studies.component';

describe('MasterStudiesComponent', () => {
  let component: MasterStudiesComponent;
  let fixture: ComponentFixture<MasterStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterStudiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
