import { Routes } from '@angular/router';
import { allUsersResolver, getUpdateUserByIdResolver } from './resolvers/user.resolver';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component.page').then(
        (mod) => mod.UsersComponentPage
      ),
    resolve: { allUsers$: allUsersResolver },
  },
  {
    path: 'users/add',
    loadComponent: () =>
      import('./pages/add-user/add-user.component.page').then(
        (mod) => mod.AddUserComponentPage
      ),
  },
  {
    path: 'users/:id/update',
    loadComponent: () =>
      import('./pages/update-user/update-user.component.page').then(
        (mod) => mod.UpdateUserComponentPage 
      ),
      resolve: { updateUser$: getUpdateUserByIdResolver },
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];
