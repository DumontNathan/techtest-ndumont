import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../http/users/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private allUsersSubject: BehaviorSubject<User[] | any> = new BehaviorSubject<
    User[] | any
  >(null);
  readonly allUsers$: Observable<User[]> = this.allUsersSubject.asObservable();

  private updateUserSubject: BehaviorSubject<User | any> = new BehaviorSubject<
  User | any
>(null);
readonly updateUser$: Observable<User> = this.updateUserSubject.asObservable();

  constructor() {}

  setAllUsers(allUsers: User[]): void {
    this.allUsersSubject.next(allUsers);
  }

  setUpdateUser(updateUser: User): void {
    this.updateUserSubject.next(updateUser);
  }
}
