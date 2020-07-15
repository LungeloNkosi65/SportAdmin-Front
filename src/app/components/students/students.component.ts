import { Component, OnInit } from '@angular/core';
import {Student} from '../../Models/Student';
import {StudentService} from '../../services/student.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];

  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
    this.studentService.getStudents().subscribe((data:any)=>{
      this.students=data;
    });
  }

  delete(studentId:string){
    this.studentService.deleteStudent(studentId).subscribe(()=>{
      this.getStudents();
    })
  }

}
