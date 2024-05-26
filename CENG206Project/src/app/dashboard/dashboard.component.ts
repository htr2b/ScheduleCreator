import { Component } from '@angular/core';
import { ClassroomComponent } from'../classroom/classroom.component';
import { InstructorsComponent } from '../instructors/instructors.component';
import { ServicesComponent } from '../services/services.component';
import { CoursesComponent } from './../courses/courses.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  [x: string]: any;
   schedules: any[] = []; // veya başka bir uygun dizi türü



  mondayLessons: any[] = [];
  tuesdayLessons: any[] = [];
  wednesdayLessons: any[] = [];
  thursdayLessons: any[] = [];
  fridayLessons: any[] = [];
  mondayLessons2: any[] = [];
  tuesdayLessons2: any[] = [];
  wednesdayLessons2: any[] = [];
  thursdayLessons2: any[] = [];
  fridayLessons2: any[] = [];
  mondayLessons3: any[] = [];
  tuesdayLessons3: any[] = [];
  wednesdayLessons3: any[] = [];
  thursdayLessons3: any[] = [];
  fridayLessons3: any[] = [];
  mondayLessons4: any[] = [];
  tuesdayLessons4: any[] = [];
  wednesdayLessons4: any[] = [];
  thursdayLessons4: any[] = [];
  fridayLessons4: any[] = [];

  constructor(
    public courseData: CoursesComponent, // Burada CoursesComponent'i enjekte ettiğinizden emin olun
    public instrData: InstructorsComponent,
    public classData: ClassroomComponent,
    public serviceData: ServicesComponent,
    private http: HttpClient
) { }
  files: { [key: string]: File } = {};


  makeTable():void{
    this.processCSVData();

  }

  async prepareTable(): Promise<void> {
    const coursesFilePath = 'Courses.csv';
    const serviceCoursesFilePath = 'service.csv';
    const classroomsFilePath = 'classroom.csv';
    const busyInstructorsFilePath = 'busy.csv';
    await this.createSchedule(coursesFilePath, serviceCoursesFilePath, classroomsFilePath, busyInstructorsFilePath);
  }
  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    this.files[fileType] = file;
  }

  async processCSVData(): Promise<void> {
    const firstYearSchedules = this.schedules.slice(0, 1);
  const secondYearSchedules = this.schedules.slice(1, 2);
  const thirdYearSchedules = this.schedules.slice(2, 3);
  const fourthYearSchedules = this.schedules.slice(3, 4);

  this.updateLessons(this.mondayLessons, firstYearSchedules, 0);
  this.updateLessons(this.tuesdayLessons, firstYearSchedules, 1);
  this.updateLessons(this.wednesdayLessons, firstYearSchedules, 2);
  this.updateLessons(this.thursdayLessons, firstYearSchedules, 3);
  this.updateLessons(this.fridayLessons, firstYearSchedules, 4);

  this.updateLessons(this.mondayLessons2, secondYearSchedules, 0);
  this.updateLessons(this.tuesdayLessons2, secondYearSchedules, 1);
  this.updateLessons(this.wednesdayLessons2, secondYearSchedules, 2);
  this.updateLessons(this.thursdayLessons2, secondYearSchedules, 3);
  this.updateLessons(this.fridayLessons2, secondYearSchedules, 4);

  this.updateLessons(this.mondayLessons3, thirdYearSchedules, 0);
  this.updateLessons(this.tuesdayLessons3, thirdYearSchedules, 1);
  this.updateLessons(this.wednesdayLessons3, thirdYearSchedules, 2);
  this.updateLessons(this.thursdayLessons3, thirdYearSchedules, 3);
  this.updateLessons(this.fridayLessons3, thirdYearSchedules, 4);

  this.updateLessons(this.mondayLessons4, fourthYearSchedules, 0);
  this.updateLessons(this.tuesdayLessons4, fourthYearSchedules, 1);
  this.updateLessons(this.wednesdayLessons4, fourthYearSchedules, 2);
  this.updateLessons(this.thursdayLessons4, fourthYearSchedules, 3);
  this.updateLessons(this.fridayLessons4, fourthYearSchedules, 4);
}

updateLessons(dayLessons: any[], yearSchedules: any[], dayIndex: number): void {
  yearSchedules.forEach(schedule => {
    const lessons = schedule.schedule[dayIndex];
    lessons.forEach((lesson: any) => {
      if (lesson.course) {
        dayLessons.push(lesson.course+'('+lesson.classroom+')');
      }else{
        dayLessons.push('-EMPTY-');
      }
    });
  });
}





async readCSVFile(filePath: any): Promise<any[]> {
  try {
      const data: any = await this.http.get(filePath, { responseType: 'text' }).toPromise();
      return data.trim().split('\n');
  } catch (err) {
      throw err;
  }
}


async parseCourses(filePath: string): Promise<Course[]> {
const rows: string[] = await this.readCSVFile(filePath);
const courses: Course[] = rows.map(row => {
    const [code, name, year, credit, core, dors, nofstudent, instructor, hours] = row.split(",");
    return new Course(
        code,
        name,
        parseInt(year),
        parseInt(credit),
        core,
        dors,
        parseInt(nofstudent),
        instructor,
        parseInt(hours)
    );
});
return courses;
}

async parseServiceCourses(filePath: string): Promise<ServiceCourse[]> {
const rows: string[] = await this.readCSVFile(filePath);
const serviceCourses: ServiceCourse[] = rows.map((row: string) => {
    const [code, day, hoursStr] = row.split(";");
    const hours: string[] = hoursStr.split(",").map(hour => hour.trim());
    return new ServiceCourse(code, day, hours);
});
return serviceCourses;
}

async parseClassrooms(filePath: string): Promise<Classroom[]> {
const rows: string[] = await this.readCSVFile(filePath);
const classrooms: Classroom[] = rows.map((row: string) => {
    const [name, capacity] = row.split(";");
    return new Classroom(name, parseInt(capacity));
});
return classrooms;
}

async parseBusyInstructors(filePath: any): Promise<BusyInstructor[]> {
const rows: string[] = await this.readCSVFile(filePath);
const busyInstructors: BusyInstructor[] = rows.map((row: string) => {
    const [name, day, hoursStr] = row.split(";");
    const hours: string[] = hoursStr.split(",").map(hour => hour.trim());
    return new BusyInstructor(name, day, hours);
});
return busyInstructors;
}


async createSchedule(coursesFilePath: string, serviceCoursesFilePath: string, classroomsFilePath: string, busyInstructorsFilePath: string): Promise<void> {
    const courses = await this.parseCourses(`assets/${coursesFilePath}`);
    const serviceCourses = await this.parseServiceCourses(`assets/${serviceCoursesFilePath}`);
    const classrooms = await this.parseClassrooms(`assets/${classroomsFilePath}`);
    const busyInstructors = await this.parseBusyInstructors(`assets/${busyInstructorsFilePath}`);





      for (let i = 0; i < 4; i++) {
          const schedule = new Schedule(5, 8);
          classrooms.forEach((classroom: any) => {
              schedule.classrooms.push(classroom);
          });
          serviceCourses.forEach((service: any) =>{
              schedule.sCourses.push(service);
          });
          busyInstructors.forEach((busy: any) =>{
              schedule.bInstructors.push(busy);
          });

          const coursesByYear: { [year: string]: Course[] } = {};

          courses.forEach((course: Course) => {
              if (!coursesByYear[course.year]) {
                  coursesByYear[course.year] = [];
              }
              coursesByYear[course.year].push(course);
          });

          if (coursesByYear[i + 1]) {
              coursesByYear[i + 1].forEach((course: Course) => {
                  schedule.addServiceCourse(course.code, course.year, course.hours, course.nofstudent, course.dors, course.instructor);
              });
          }

          if (coursesByYear[i + 1]) {
              coursesByYear[i + 1].forEach((course: Course) => {
                  schedule.addCourse(course.code, course.year, course.hours, course.nofstudent, course.dors, course.instructor);
              });

          }
          newSchedules.push(schedule);
        }
        this.schedules=newSchedules;
        const missingCourses = this.checkMissingCourses(courses);

        if (missingCourses.length > 0) {
          alert("These courses could not be added, please add new classes:  " + missingCourses.join(", ") );

        }

  }
  checkMissingCourses(courses: Course[]): string[] {
      const allCourses = courses.map(course => course.code);
      const addedCourses = newSchedules.flatMap(schedule => schedule.schedule.flat().map(cell => cell.course)).filter(Boolean);
      return allCourses.filter(course => !addedCourses.includes(course));
    }

  }

  const newSchedules: Schedule[] = [];
  const schedules: Schedule[] = [];

  class Schedule {
    schedule: any[][];
    classrooms: any[];
    sCourses: any[];
    bInstructors: any[];
      constructor(rows: any, cols: any) {
          this.schedule = new Array(rows).fill(null).map(() => new Array(cols).fill({ course: null, classroom: null }));
          this.classrooms = [];
          this.sCourses = [];
          this.bInstructors = [];
      }


      addServiceCourse(courseCode: any, year: any, hours: any, nofstudent: any, dors: any, instructor: any) {
          if (dors === "S") {
              const serviceCourse = this.sCourses.find((serviceCourse: { code: any; }) => serviceCourse.code === courseCode);
              if (!serviceCourse) {
                  console.log("Warning: Service course not found.");
                  return;
              }

              const dayIndex = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].indexOf(serviceCourse.day);
              if (dayIndex === -1) {
                  console.log("Warning: Invalid day for service course.");
                  return;
              }

              let z = 0;

              for (let i = 0; i < serviceCourse.hours.length; i++) {
                  const hour = serviceCourse.hours[i];
                  const hourIndex = ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30"].indexOf(hour);

                  if (hourIndex === -1) {
                      if (this.schedule[dayIndex] && this.schedule[dayIndex][z] && this.schedule[dayIndex][z].course === null && this.isAvailable(dayIndex, z, year, instructor)) {
                          const assignedClassroom = this.getAvailableClassroomWithCapacity(hours, nofstudent, dayIndex, z);
                          if (assignedClassroom) {
                              this.schedule[dayIndex][z] = { course: courseCode, classroom: assignedClassroom.name };
                              z++;
                          } else {
                              console.log("Warning: No available classroom found or capacity is insufficient for ${courseCode} at ${serviceCourse.day} ${hour}.");
                          }
                      }
                  } else {
                      if (this.schedule[dayIndex] && this.schedule[dayIndex][hourIndex] && this.schedule[dayIndex][hourIndex].course === null && this.isAvailable(dayIndex, hourIndex, year, instructor)) {
                          const assignedClassroom = this.getAvailableClassroomWithCapacity(hours, nofstudent, dayIndex, hourIndex);
                          if (assignedClassroom) {
                              this.schedule[dayIndex][hourIndex] = { course: courseCode, classroom: assignedClassroom.name };
                          } else {
                              console.log("Warning: No available classroom found or capacity is insufficient for ${courseCode} at ${serviceCourse.day} ${hour}.");
                          }
                      } else {
                          console.log("Warning: Classroom ${assignedClassroom.name} is already occupied at ${serviceCourse.day} ${hour}.");
                      }
                  }
              }
          }
      }

      addCourse(courseCode: any, year: any, hours: any, nofstudent: any, dors: any, instructor: any) {
          let hourCount = 0;
          let assignedClassroom: any = null;
          let consecutiveHours = 0;
          if (hours === 2) {
              return this.addTwoPlusOneCourse(courseCode, year, hours, nofstudent, dors, instructor);
          }
          if (dors === "S") {
              return this.addServiceCourse(courseCode, year, hours, nofstudent, dors, instructor);
          } else {
              for (let i = 0; i < this.schedule.length; i++) {
                  for (let j = 0; j < this.schedule[i].length; j++) {
                      if (this.schedule[i][j].course === null && hourCount < hours && this.isAvailable(i, j, year, instructor)) {
                          if (!assignedClassroom) {
                              assignedClassroom = this.getAvailableClassroomWithCapacity(hours, nofstudent, i, j);
                          }
                          if (assignedClassroom) {
                              const isClassroomAvailableInAllSchedules = newSchedules.every(schedule => {
                                  return schedule.schedule[i][j].classroom !== assignedClassroom.name;
                              });

                              if (isClassroomAvailableInAllSchedules) {
                                  if (this.schedule[i][j + 1] && this.schedule[i][j + 1].course === null && this.isAvailable(i, j + 1, year, instructor)) {
                                      consecutiveHours++;
                                  } else {
                                      consecutiveHours = 0;
                                  }

                                  if (consecutiveHours === hours) {
                                      for (let k = 0; k < hours; k++) {
                                          this.schedule[i][j - k] = { course: courseCode, classroom: assignedClassroom.name };
                                      }
                                      hourCount += hours;
                                      assignedClassroom = null;
                                      consecutiveHours = 0;
                                  }
                              } else {
                                  assignedClassroom = this.getAvailableClassroomWithCapacity(hours, nofstudent, i, j);
                                  console.log("Warning: Classroom ${assignedClassroom.name} is already occupied for ${courseCode}.");
                              }
                          } else {
                              console.log("Warning: No available classroom found or capacity is insufficient for ${courseCode}.");
                          }
                      }
                  }
              }
          }
      }
      addTwoPlusOneCourse(courseCode: any, year: any, hours: any, nofstudent: any, dors: any, instructor: any) {
          let assignedClassroom: any = null;
          let consecutiveHours = 0;

          for (let i = 0; i < this.schedule.length; i++) {
              for (let j = 0; j < this.schedule[i].length; j++) {
                  if (this.schedule[i][j].course === null && this.isAvailable(i, j, year, instructor)) {
                      if (!assignedClassroom) {
                          assignedClassroom = this.getAvailableClassroomWithCapacity(hours, nofstudent, i, j);
                      }

                      if (assignedClassroom) {
                          const isClassroomAvailableInAllSchedules = newSchedules.every(schedule => {
                              return schedule.schedule[i][j].classroom !== assignedClassroom.name;
                          });

                          if (isClassroomAvailableInAllSchedules) {
                              if (this.schedule[i][j + 1] && this.schedule[i][j + 1].course === null && this.isAvailable(i, j + 1, year, instructor)) {
                                  consecutiveHours++;
                              } else {
                                  consecutiveHours = 0;
                              }

                              if (consecutiveHours === 2) {
                                  for (let k = 0; k < 2; k++) {
                                      this.schedule[i][j - k] = { course: courseCode, classroom: assignedClassroom.name };
                                  }
                                  const nextDay = (i + 1) % 5;
                                  let foundEmptySlot = false;

                                  for (let k = 0; k < this.schedule[nextDay].length; k++) {
                                      const isClassroomAvailableInAllSchedules = newSchedules.every(schedule => {
                                          return schedule.schedule[nextDay][k].classroom !== assignedClassroom.name;
                                      });
                                      if (this.schedule[nextDay][k].course === null && this.isAvailable(nextDay, k, year, instructor) && isClassroomAvailableInAllSchedules) {
                                          this.schedule[nextDay][k] = { course: courseCode, classroom: assignedClassroom.name };
                                          foundEmptySlot = true;
                                          break;
                                      }
                                  }
                                  if (!foundEmptySlot) {
                                      console.log(`Warning: No available slot found for ${courseCode} on the next day.`);
                                  }
                                  return;
                              }
                          } else {
                              console.log(`Warning: Classroom ${assignedClassroom.name} is already occupied for ${courseCode}.`);
                          }
                      } else {
                          console.log(`Warning: No available classroom found or capacity is insufficient for ${courseCode}.`);
                      }
                  }
              }
          }
      }



      getAvailableClassroomWithCapacity(hours: any, nofstudent: any, dayIndex: number, hourIndex: number) {
          const availableClassrooms = this.classrooms.sort((a, b) => a.capacity - b.capacity);
          for (let i = 0; i < availableClassrooms.length; i++) {
              const classroom = availableClassrooms[i];
              if (classroom.capacity >= hours && classroom.capacity >= nofstudent) {
                  const isClassroomAvailableInAllSchedules = newSchedules.every(schedule => {
                      return schedule.schedule[dayIndex][hourIndex].classroom !== classroom.name;
                  });

                  if (isClassroomAvailableInAllSchedules) {

                      return classroom;
                  }
              }
          }

          return null;
      }

      isAvailable(row: any, col: any, year: any, instructor: any) {
        const slotAvailable = this.schedule[row][col].course === null;
        const instructorBusy = this.bInstructors.some((busyInstructor: { name: any; day: string; hours: string | string[]; }) => {
            return busyInstructor.name === instructor && busyInstructor.day === ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][row] && busyInstructor.hours.includes(["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30"][col]);
        });

        return slotAvailable && !instructorBusy;
    }
}
class Course {
  code: any;
  name: any;
  year: any;
  credit: any;
  core: any;
  dors: any;
  nofstudent: any;
  instructor: any;
  hours: any;
  constructor(code: any, name: any, year: any, credit: any, core: any, dors: any, nofstudent: any, instructor: any, hours: any) {
      this.code = code;
      this.name = name;
      this.year = year;
      this.credit = credit;
      this.core = core;
      this.dors = dors;
      this.nofstudent = nofstudent;
      this.instructor = instructor;
      this.hours = hours;
  }
}
class ServiceCourse {
  code: any;
  day: any;
  hours: any;
  constructor(code: any, day: any, hours: any) {
      this.code = code;
      this.day = day;
      this.hours = hours;
  }
}

class Classroom {
  name: any;
  capacity: any;
  constructor(name: any, capacity: any) {
      this.name = name;
      this.capacity = capacity;
  }
}

class BusyInstructor {
  name: any;
  day: any;
  hours: any;
  constructor(name: any, day: any, hours: any) {
      this.name = name;
      this.day = day;
      this.hours = hours;
  }
}


