import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];
  user: User = {
    id: null,
    firstName: '',
    lastName: '',
    balance: null,
    date: null,
    age: null,
    email: '',
  };
  showExtend: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = true;
  @ViewChild('userForm') form: any;
  data: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.userService.getUsers().subscribe((users) => {
        this.users = users;
        this.loaded = true;
      });
    }, 1000);
  }

  addNewUser(user: User): void {
    this.users.push(user);
  }

  delUser(e): void {
    this.users.shift();
  }

  toogleDetails(): void {
    this.showExtend = !this.showExtend;
  }

  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    console.log(value);
    if (!valid) {
      console.log('Form valid');
    } else {
      value.isActive = true;
      value.date = new Date();
      value.hide = false;
      value.image = `https://avatars.dicebear.com/api/avataaars/${
        this.users.length + 1
      }.svg`;
      this.userService.addUser(value);
      this.form.reset();
    }
  }
}
