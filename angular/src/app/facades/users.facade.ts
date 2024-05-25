import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../http/users/users.model';
import { UsersService } from '../http/users/users.service';
import { UsersStore } from '../stores/users.store';

@Injectable({
  providedIn: 'any',
})
export class UsersFacade {
  constructor(
    private usersStore: UsersStore,
    private usersService: UsersService
  ) {}

  get allUsers$(): Observable<User[]> {
    return this.usersStore.allUsers$;
  }

  get updateUser$(): Observable<User> {
    return this.usersStore.updateUser$;
  }

  fetchAllUsers$(): Observable<void> {
    return this.usersService.getAllUsers$().pipe(
      tap((allUsers: User[]) => {
        this.usersStore.setAllUsers(allUsers);
      }),
      map((res) => res as unknown as void)
    );
  }

  fetchUpdateUserById$(id: number): Observable<void> {
    return this.usersService.getUserById$(id).pipe(
      tap((user: User) => {
        this.usersStore.setUpdateUser(user);
      }),
      map((res) => res as unknown as void)
    );
  }

  createUser(userCreateInfos: User): Observable<void> {
    return this.usersService
      .createUser(userCreateInfos)
      .pipe(map((res) => res as unknown as void));
  }

  updateUser(updateUserInfos: User): Observable<void> {
    return this.usersService
      .updateUser(updateUserInfos)
      .pipe(map((res) => res as unknown as void));
  }

  deleteUser(userDeleteInfos: User): Observable<void> {
    return this.usersService
      .deleteUser(userDeleteInfos)
      .pipe(map((res) => res as unknown as void));
  }
}
