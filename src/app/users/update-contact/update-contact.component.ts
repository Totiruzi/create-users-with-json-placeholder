import { UsersService } from './../details/users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {
  contactId: string;
  contact: User;
  constructor(private userService: UsersService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('contactId')) {
        this.contactId = paramMap.get('contactId');
        this.updateContact(this.contactId, this.contact);
        // this.userService.getUser(this.contactId).subscribe((contactData) => {
        //   this.contact = {
        //     id: contactData.id,
        //     firstName: contactData.firstName,
        //     LastName: contactData.LastName,
        //     email: contactData.email,
        //     telephone: contactData.telephone,
        //   };
        // });
      }
    });
  }

  updateContact(id: string, info: User) {
    const contactIfo: User = {
      id,
      firstName: info.firstName,
      LastName: info.LastName,
      email: info.email,
      telephone: info.telephone,
    };
    this.userService.updateContact(this.contactId, contactIfo);
    console.log(contactIfo);

  }
  onUpdateContact(form: NgForm) {
    if (form.invalid) {
      return;
    }
    form.resetForm();
  }
}
