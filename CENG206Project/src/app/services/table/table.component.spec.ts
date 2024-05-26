import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponentt } from './table.component';

describe('TableComponent', () => {
  let component: TableComponentt;
  let fixture: ComponentFixture<TableComponentt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponentt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponentt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
