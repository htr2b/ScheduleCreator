import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-classroom-table',
  templateUrl: './classroom-table.component.html',
  styleUrl: './classroom-table.component.css'
})
export class ClassroomTableComponent {
  @Input() dataSource: any[] = [];

  displayedColumns: string[] = ['name', 'capacity','edit'];
  deleteContent(row: any) {
    row[0] = '';
    row[1] = '';
  }
}
