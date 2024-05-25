import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiPath = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getAllUsers$(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiPath}`);
  }

  getUserById$(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiPath}/${id}`);
  }

  createUser(userCreateInfos: User): Observable<User> {
    return this.http.post<User>(`${this.apiPath}`, userCreateInfos);
  }

  updateUser(userUpdateInfos: User): Observable<User> {
    return this.http.patch<User>(
      `${this.apiPath}/${userUpdateInfos.id}`,
      userUpdateInfos
    );
  }

  deleteUser(userDeleteInfos: User): Observable<User> {
    return this.http.delete<User>(`${this.apiPath}/${userDeleteInfos.id}`);
  }
}
