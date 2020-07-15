import { Department } from './Department';

export interface Course{
    CourseId:number;
    DepartmentId:number;
    Department:Department;
    CourseName:string;
}