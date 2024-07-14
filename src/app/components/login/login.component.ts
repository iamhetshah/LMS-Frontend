import {
  Component,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Validation } from '../../utils/validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private user: UserService = inject(UserService);
  errors: WritableSignal<string[]> = signal([]);
  private validate = new Validation();
  tooglePassword = false;
  constructor() {}

  login(email: string, password: string) {
    this.errors.set([]);
    if (!this.validate.validateEmail(email)) {
      this.errors.update((old) => [...old, 'You must enter valid email!']);
      return;
    }
    const passwordErrors = this.validate.validatePassword(password);
    if (passwordErrors.length != 0) {
      this.errors.update((old) => [...old, ...passwordErrors]);
      return;
    }

    this.user.login(email, password);
  }
}
