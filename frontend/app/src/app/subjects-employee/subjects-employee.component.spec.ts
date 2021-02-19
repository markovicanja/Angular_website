import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsEmployeeComponent } from './subjects-employee.component';

describe('SubjectsEmployeeComponent', () => {
  let component: SubjectsEmployeeComponent;
  let fixture: ComponentFixture<SubjectsEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
