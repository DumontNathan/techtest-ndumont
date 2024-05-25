import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { WORDING } from '../../../assets/wording';
import { User } from '../../http/users/users.model';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input() usersList: User[];
  @Output() deleteUser: EventEmitter<User> = new EventEmitter();
  subscription = new Subscription();
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'id',
    'delete',
    'update',
  ];

  constructor(public deleteDialog: MatDialog) {
    this.usersList = [];
  }

  openDeleteDialog(user: User): void {
    const deleteDialogRef = this.deleteDialog.open(DeleteUserDialogComponent, {
      data: user,
    });

    this.subscription.add(
      deleteDialogRef.afterClosed().subscribe((user) => {
        if (user) {
          this.deleteUser.emit(user);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected readonly WORDING = WORDING;
}
