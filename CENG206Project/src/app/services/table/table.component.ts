import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponentt {
  @Input() dataSource: any[] = [];

  displayedColumns: string[] = ['name', 'day', 'hours'];
  deleteContent(row: any) {
    row[0] = '';
    row[1] = '';
    row[2] = '';

  }
}
