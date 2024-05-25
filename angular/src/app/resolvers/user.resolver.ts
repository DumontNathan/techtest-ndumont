import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersFacade } from '../facades/users.facade';

export const allUsersResolver: ResolveFn<Observable<void>> = () => {
  return inject(UsersFacade).fetchAllUsers$();
};

export const getUpdateUserByIdResolver: ResolveFn<Observable<void>> = (route) => {
  return inject(UsersFacade).fetchUpdateUserById$(route.params['id']);
};
