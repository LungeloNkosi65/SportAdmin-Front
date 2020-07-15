import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/models/Faculty';
import {FacultyService} from '../../services/faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  faculties:Faculty[];

  constructor(private facultyService:FacultyService) { }

  ngOnInit(): void {
    this.getFaculties();
  }

  
  getFaculties(){
    this.facultyService.getFaculties().subscribe((data:any)=>{
      this.faculties=data;
      console.log('Db.. F', this.faculties) 
    });
  }


}
