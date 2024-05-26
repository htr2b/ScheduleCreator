import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InstructorsComponent } from './instructors/instructors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { TableComponent } from './instructors/table/table.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClassroomTableComponent } from './classroom/classroom-table/classroom-table.component';
import { CourseTableComponent } from './courses/course-table/course-table.component';
import { ServicesComponent } from './services/services.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    InstructorsComponent,
    DashboardComponent,
    CoursesComponent,
    ClassroomTableComponent,
    FileSelectorComponent,
    ClassroomComponent,
    CourseTableComponent,
    ServicesComponent,
    TableComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    NgxCsvParserModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [
    provideAnimationsAsync()
    ,CoursesComponent,
    InstructorsComponent,
    ClassroomComponent,
    ServicesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
