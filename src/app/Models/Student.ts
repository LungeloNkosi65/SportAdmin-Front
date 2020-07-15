import { NumberSymbol } from '@angular/common';
import { Course } from './Course';

export interface Student{
    StudentId:string;
    CourseId:Number;
    Course:Course;
    StudentNumber:string;
    Name:string;
    Level:string;
    Password:string;
    ConfirmPassword:string;
}