import { User } from './../user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class UsersService {
  url = 'http://localhost:3000/users';
  constructor(private http: HttpClient ) {}

  getUsers() {return this.http.get<User[]>(this.url);
  // .pipe(
  //   tap((data) => console.log('Products: ', JSON.stringify(data))),
  //   catchError(this.handleError)
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
