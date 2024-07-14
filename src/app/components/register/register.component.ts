import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Validation } from '../../utils/validation';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  tooglePassword1 = false;
  tooglePassword2 = false;
  private user: UserService = inject(UserService);
  errors: WritableSignal<string[]> = signal([]);
  private validate = new Validation();
  public register(
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    address: string,
    pinCode: number
  ) {
    console.log('new user');

    this.errors.set([]);
    if (!fullName) {
      this.errors.update((old) => [...old, 'Enter full name']);
      return;
    }

    if (!this.validate.validateEmail(email)) {
      this.errors.update((old) => [...old, 'You must enter valid email!']);
      return;
    }

    if (!phoneNumber) {
      this.errors.update((old) => [...old, 'Enter phone number']);
      return;
    } else {
      if (!parseInt(phoneNumber)) {
        this.errors.update((old) => [...old, 'Enter valid phone number']);
        return;
      }
    }

    if (address.length === 0) {
      this.errors.update((old) => [...old, 'Fill your address!']);
      return;
    }

    if (pinCode < 100000 || pinCode > 999999) {
      this.errors.update((old) => [...old, 'Enter valid pincode!']);
      return;
    }
    const passwordErrors = this.validate.validatePassword(password);
    if (passwordErrors.length != 0) {
      this.errors.update((old) => [...old, ...passwordErrors]);
      return;
    }

    if (confirmPassword !== password) {
      this.errors.update((old) => [...old, 'Passwords not matching!']);
      return;
    }

    const [firstName, lastName] = fullName.split(' ');
    this.user.signup({
      firstName,
      lastName,
      password,
      phoneNumber,
      pinCode,
      address,
      email,
    });
  }
}
