import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

 
  courses:Course[];
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    console.log('Im in course')
    this.getCourses();
  }

  getCourses(){
    this.courseService.getCourse().subscribe((data:any)=>{
      this.courses=data;
      console.log('Retreived Courses', this.courses)
    })
  }

}
