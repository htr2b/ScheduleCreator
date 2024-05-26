// InstructorsComponent
import { Component } from '@angular/core';
import { BusyService } from '../busy.service';
import { Busy } from '../busy';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent {
  busyDict!: { [key: string]: Busy; };
  dataSource: any[] = [];

  constructor(private busyService: BusyService) { }

  onFileSelected(file: File): void {
    this.busyService.parseCsv(file).then(result => {
      if (result) {
        this.busyDict = (result as any[][]).reduce((acc: { [key: string]: any }, row: any[]) => {
          const [name, ...rest] = row;
          acc[name] = [name, ...rest];
          return acc;
        }, {});
        this.dataSource = Object.values(this.busyDict);
      }
    }).catch(error => {
      console.error('Error occurred while reading CSVs', error);
    });
  }

  getDataSource(): any[] {
    return this.dataSource;
  }
}
