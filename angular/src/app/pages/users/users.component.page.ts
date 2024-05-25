import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UsersComponent } from '../../components/users/users.component';
import { UsersFacade } from '../../facades/users.facade';
import { User } from '../../http/users/users.model';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './users.component.page.html',
  styleUrl: './users.component.page.css',
})
export class UsersComponentPage {
  allUsers$: Observable<User[]>;
  subscription = new Subscription();

  constructor(
    private usersFacade: UsersFacade,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.allUsers$ = usersFacade.allUsers$;
    this.activatedRoute.data.subscribe();
  }

  onDeleteUser(user: User) {
    this.subscription.add(
      this.usersFacade.deleteUser(user).subscribe({
        next: (u) => {
          window.location.reload();
        },
        // error: (e) => {
        //   console.log(e);
        //   if (e.status === 409) {
        //     this.showErrorMessage = true;
        //   }
        // },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
