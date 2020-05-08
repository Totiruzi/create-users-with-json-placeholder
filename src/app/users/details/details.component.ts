import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subject, EMPTY, Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  users: User[] = [];
  private userSub: Subscription;
  columns = [
    'User Id',
    'first Name',
    'Last Name',
    'Email',
    'telephone',
    'image',
  ];
  index = [
    'id',
    'firstName',
    'LastName',
    'email',
    'telephone',
    'image',
    'options',
  ];
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.displayContacts();
    // this.userService.getUserUdateListener().subscribe((users: User[]) => {
    //     this.users = users;
    //   });
  }

  displayContacts() {
    this.userService.users$.subscribe((response) => (this.users = response)),
      catchError((err) => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      });
  }
  onEdit() {}

  onDelete(userId: string) {
    this.userService.deleteContact(userId);
    this.displayContacts();
  }
}
