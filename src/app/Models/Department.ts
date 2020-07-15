import { Faculty } from './Faculty';

export interface Department{
    DepartmentId:number;
    FacultyId:number;
    DepartmentName:string;
    Faculty:Faculty;

}