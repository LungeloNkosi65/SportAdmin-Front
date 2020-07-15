import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/Department';
import { DepartmentService } from 'src/app/services/department.service';
import { Faculty } from '../../models/Faculty';
import { FacultyService } from 'src/app/services/faculty.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: Department[]=[];
  department: Department;
  facultyData: Faculty[];
  facultyId:number;
  departmentForm: any;
  virtualFaculty:Faculty;


  constructor(private departmenService: DepartmentService, private formBuilder: FormBuilder, private facultyService: FacultyService) {
   
  }

  ngOnInit(): void {
    this.departmentForm=this.formBuilder.group({
      departmentName:['',[Validators.required]]
    });
    this.getFaculties();
    this.getDepartments();
  }

  getDepartments() {
    this.departmenService.getDepartment().subscribe((data: any) => {
      this.departments = data;
      console.log('Retreived Departments', this.departments);
    });
  }

  addDepartment(department: Department) {
    if (department != undefined || department !== null) {
      // department.DepartmentId=this.departments.length+6; NAWE MASIMBAKHO
      department.FacultyId=this.facultyId;
      // department.Faculty=this.virtualFaculty; // DO NOT EVER PUT THIS KWI DB LEAVE IT NULL
      console.log('Department Record', department);
      this.departmenService.addDepartment(department).subscribe(() => {
        this.getDepartments();
        // console.log('filterd faculty',this.filterdFaculty.pop(department.FacultyId))
      
      });
    }
  }

  deleteDepartment(departmentId: number) {
    this.departmenService.deleteDepartment(departmentId).subscribe(() => {
      this.getDepartments();
    });
  }


  populateForm(departmentId: number) {
    this.departmenService.getSingleDepartment(departmentId).subscribe((data: any) => {
      this.department = data;
    });
  }
  getFaculties() {
    this.facultyService.getFaculties().subscribe((data: any) => {
      this.facultyData = data;
     });
  }

  getFacultyId(facultyId:number) {
    this.facultyId=facultyId;
    this.facultyService.getSingleFaculty(facultyId).subscribe((data:any)=>{
      this.virtualFaculty=data;
    })
    console.log('FAcultyID',this.facultyId)
    return this.facultyId;
  }
  onFormSubmit(){
    const departData=this.departmentForm.value;
    console.log('Form departData',this.facultyData);
    this.addDepartment(departData);
    return departData;
  }

  delete(departmentId:number){
    this.departmenService.deleteDepartment(departmentId).subscribe(()=>{
      this.getDepartments();
    });
  }


 


  

}
