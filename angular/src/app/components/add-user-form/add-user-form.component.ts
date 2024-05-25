import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WORDING } from '../../../assets/wording';
import { User } from '../../http/users/users.model';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.css',
})
export class AddUserFormComponent {
  @Input() updateUser?: User;
  @Output() userFormValue: EventEmitter<User> = new EventEmitter();
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.updateUser) {
      this.userForm.setValue({
        firstName: this.updateUser.firstName,
        lastName: this.updateUser.lastName,
      });
    }
  }

  submitUser(): void {
    if (this.userForm.valid) {
      if (this.updateUser) {
        this.userFormValue.emit({
          ...this.userForm.value,
          id: this.updateUser.id,
        });
      } else {
        this.userFormValue.emit(this.userForm.value);
      }
    }
  }

  isUpdateFormValid() {
    if (
      (this.userForm.value.lastName !== this.updateUser?.lastName ||
        this.userForm.value.firstName !== this.updateUser?.firstName) &&
      this.userForm.valid
    )
      return true;

    return false;
  }

  protected readonly WORDING = WORDING;
}
