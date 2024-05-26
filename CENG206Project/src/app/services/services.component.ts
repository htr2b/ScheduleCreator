// ServicesComponent
import { Component } from '@angular/core';
import { CsvServiceService } from '../csv-service.service';
import { csvservice } from '../csv-service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  busyDict!: { [key: string]: csvservice };
  dataSource: any[] = [];

  constructor(private busyService: CsvServiceService) {}

  onFileSelected(file: File): void {
    this.busyService
      .parseCsv(file)
      .then((result) => {
        if (result) {
          this.busyDict = (result as any[][]).reduce(
            (acc: { [key: string]: any }, row: any[]) => {
              const [name, ...rest] = row;
              acc[name] = [name, ...rest];
              return acc;
            },
            {}
          );
          this.dataSource = Object.values(this.busyDict);
        }
      })
      .catch((error) => {
        console.error('Error occurred while reading CSVs', error);
      });
  }

  getDataSource(): any[] {
    return this.dataSource;
  }
}
