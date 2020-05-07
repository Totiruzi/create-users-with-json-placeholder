import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subject, EMPTY } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  users: User[] = [];
  columns = ['User Id', 'first Name', 'Last Name', 'Email', 'telephone'];
  index = ['id', 'firstName', 'LastName', 'email', 'telephone', 'options'];
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((response) => (this.users = response)),
      catchError((err) => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      });
  }

  onEdit() {}

  onDelete() {}
}
