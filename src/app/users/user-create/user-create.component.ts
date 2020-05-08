import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from './../details/users.service';
import { User } from './../user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  fnValue = '';
  lnValue = '';
  emValue = '';
  phValue = '';
  image? = '';
  private mode = 'create';
  private contactId: string;
  contact: User;
  constructor(public userService: UsersService, public route: ActivatedRoute) {}
  json;
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('contactId')) {
        this.mode = 'edit';
        this.contactId = paramMap.get('contactId');
        this.userService.getUser(this.contactId).subscribe((contactData) => {
          this.contact = {
            id: contactData.id,
            firstName: contactData.firstName,
            LastName: contactData.LastName,
            email: contactData.email,
            telephone: contactData.telephone,
          };
        });
      } else {
        this.mode = 'create';
        this.contactId = null;
      }
    });
  }

  onSaveContact(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const contactIfo: User = {
      firstName: form.value.firstName,
      LastName: form.value.LastName,
      email: form.value.email,
      telephone: form.value.telephone,
    };
    if (this.mode === 'create') {
      this.userService.addContact(contactIfo);
    } else {
      this.userService.updateContact(this.contactId, contactIfo);
    }

    console.log(contactIfo);
    this.json = JSON.stringify(contactIfo);
    form.resetForm();
  }
}
