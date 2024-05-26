import { Component, Input } from '@angular/core';

@Component({
  selector: 'instructors-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() dataSource: any[] = [];

  displayedColumns: string[] = ['name', 'day', 'hours', 'edit'];
  deleteContent(row: any) {
    row[0] = '';
    row[1] = '';
    row[2] = '';
    row[3] = '';
  }
}
