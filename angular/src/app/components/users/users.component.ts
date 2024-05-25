import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UsersListComponent } from '../users-list/users-list.component';
import { WORDING } from '../../../assets/wording';
import { Observable } from 'rxjs';
import { User } from '../../http/users/users.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    UsersListComponent,
    CommonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  @Input() allUsers$?: Observable<User[]>;
  @Output() deleteUser: EventEmitter<User> = new EventEmitter();

  onDeleteUser(user: User): void {
    this.deleteUser.emit(user);
  }

  protected readonly WORDING = WORDING;
}
