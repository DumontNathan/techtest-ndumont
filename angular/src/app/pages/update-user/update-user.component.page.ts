import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { UsersFacade } from '../../facades/users.facade';
import { User } from '../../http/users/users.model';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [AddUserComponent, CommonModule],
  templateUrl: './update-user.component.page.html',
  styleUrl: './update-user.component.page.css',
})
export class UpdateUserComponentPage {
  updateUser$: Observable<User>;  
  showErrorMessage: boolean;
  subscription = new Subscription();

  constructor(
    private usersFacade: UsersFacade,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.showErrorMessage = false;
    this.updateUser$ = usersFacade.updateUser$;
    this.activatedRoute.data.subscribe();
  }

  onUpdateUser(updateUserInfos: User) {
    this.subscription.add(
      this.usersFacade.updateUser(updateUserInfos).subscribe({
        next: (u) => this.router.navigate(['/users']),
        error: (e) => {
          console.log(e);
          if (e.status === 409) {
            this.showErrorMessage = true;
          }
        },
      })
    );
  }
}
