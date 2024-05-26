import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.css'
})
export class CourseTableComponent {
  @Input() dataSource: any[] = [];

  displayedColumns: string[] = ['code', 'name', 'year', 'credit', 'core', 'dors', 'nofstudent', 'instructor', 'hours', 'edit'];
  deleteContent(row: any) {
    row[0] = '';
    row[1] = '';
    row[2] = '';
    row[3] = '';
    row[4] = '';
    row[5] = '';
    row[6] = '';
    row[7] = '';
    row[8] = '';
  }

}
