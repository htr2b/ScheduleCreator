import { Component } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courseDict!: { [key: string]: Course; };
  dataSource: any[] = [];

  constructor(private courseService: CourseService) {

   }
   onFileSelected(file: File): void {
    this.courseService.parseCsv(file).then(result => {
      if (result) {
        this.courseDict = (result as any[][]).reduce((acc: { [key: string]: any }, row: any[]) => {
          const [name, ...rest] = row;
          acc[name] = [name, ...rest];
          console.log("acc is: " + acc[0]);
          return acc;
        }, {});
        console.log(this.courseDict);
        this.dataSource = Object.values(this.courseDict);
      }
    }).catch(error => {
      console.error('Error occurred while reading CSVs', error);
    });
  } getDataSource(): Course[] {
    return this.dataSource;
  }

}
