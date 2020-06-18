import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[];
  data: Observable<any>;

  constructor() {
    this.users = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 32,
        image: 'https://avatars.dicebear.com/api/avataaars/1.svg',
        isActive: true,
        date: new Date('01/02/2019'),
        balance: 12000,
        hide: false,
        email: 'John@gmail.com',
      },
      {
        id: 2,
        firstName: 'Adam',
        lastName: 'Smith',
        age: 32,
        image: 'https://avatars.dicebear.com/api/avataaars/2.svg',
        isActive: false,
        date: new Date('11/2/2018'),
        balance: 45000,
        hide: false,
        email: 'Adam@gmail.com',
      },
      {
        id: 3,
        firstName: 'Kevin',
        lastName: 'Johnson',
        age: 32,
        image: 'https://avatars.dicebear.com/api/avataaars/3.svg',
        isActive: false,
        date: new Date('12/04/2020'),
        balance: 102000,
        hide: false,
        email: 'Kevin@gmail.com',
      },
    ];
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User) {
    this.users.unshift(user);
  }
}
