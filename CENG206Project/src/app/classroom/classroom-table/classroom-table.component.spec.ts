import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomTableComponent } from './classroom-table.component';

describe('ClassroomTableComponent', () => {
  let component: ClassroomTableComponent;
  let fixture: ComponentFixture<ClassroomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassroomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
