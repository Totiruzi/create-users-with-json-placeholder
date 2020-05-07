import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  fnValue = '';
  lnValue = '';
  emValue = '';
  phValue = '';
  @Output() contactCreate = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onAddContact() {
    const contactIfo = {
      firstName: this.fnValue,
      lastName: this.lnValue,
      email: this.emValue,
      phone: this.phValue
    };
    this.contactCreate.emit(contactIfo);
  }
}
