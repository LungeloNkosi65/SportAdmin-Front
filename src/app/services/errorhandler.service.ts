import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {

  constructor() { }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return of([]);

  }
}
