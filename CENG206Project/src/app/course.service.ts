import { Injectable } from '@angular/core';
import { NgxCSVParserError, NgxCsvParser } from 'ngx-csv-parser';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private ngxCsvParser: NgxCsvParser) { }

  async parseCsv(file: File): Promise<any[] | NgxCSVParserError | undefined>{
    console.log("courseService parseCSV called");
    try {
      const result = await this.ngxCsvParser.parse(file, { header: false, delimiter: ',' }).pipe().toPromise();
      return result;
    } catch (error) {
      console.error('Error occurred while reading CSVs', error);
      return undefined;
    }
  }
}
