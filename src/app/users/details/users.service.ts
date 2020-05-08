import { User } from './../user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[];
  user: User;
  private contactsUpdated = new Subject<User[]>();
  url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  users$ = this.http.get<User[]>(this.url).pipe(
    tap((data) => console.log('contacts: ', JSON.stringify(data))),
    catchError(this.handleError)
  );
  // .subscribe((response) => (this.users = response));

  getUsers() {
    this.http
      .get<User[]>(this.url)
      .subscribe((contactData) => (this.users = contactData));
    this.contactsUpdated.next([...this.users]);
  }

  getUser(id: string) {
    return this.http.get<User>(this.url + '/' + id);
  }

  getUserUdateListener() {
    return this.contactsUpdated.asObservable();
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

  addContact(detail: User) {
    const contact: User = {
      firstName: detail.firstName,
      LastName: detail.LastName,
      email: detail.email,
      telephone: detail.telephone,
    };
    this.http.post<User[]>(this.url, contact).subscribe((responseData) => {
      console.log(responseData);
      // this.users.push(contact);
      // this.contactsUpdated.next([...this.users]);
    });
  }

  updateContact(id: string, contact: User) {
    const contactInfo: User = {
      id,
      firstName: contact.firstName,
      LastName: contact.LastName,
      email: contact.email,
      telephone: contact.telephone,
    };
    this.http
      .patch<User>(this.url + '/' + id, contactInfo)
      .subscribe((response) => {
        const updatedContacts = [...this.users];
        const oldContactIndex = updatedContacts.findIndex(p => p.id === contactInfo.id);
        updatedContacts[oldContactIndex] = contactInfo;
        this.users = updatedContacts;
        this.contactsUpdated.next([...this.users]);
      });
  }
  deleteContact(userId: string) {
    this.http.delete<User[]>(this.url + '/' + userId).subscribe(() => {
      // const updatedContactList = this.users.filter(
      //   (user) => user.id !== userId
      // );
      // this.users = updatedContactList;
      // this.contactsUpdated.next([...this.users]);
    });
  }
}
