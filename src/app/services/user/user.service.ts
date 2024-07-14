import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { catchError, map, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BASE_URL } from '../../utils/ip';

enum UserErrors {
  UDNE = 'UDNE',
  EMIR = 'EMIR',
  UPNM = 'UPNM',
  USRS = 'USRS',
  AFIR = 'AFIR',
  UALE = 'UALE',
  SMWR = 'SMWR',
  ULGO = 'ULGO',
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _baseURL = BASE_URL;
  private _isAuthenticated = signal(false);
  private _user = signal({
    UUID: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    pinCode: 0,
    role: '',
  });

  public user() {
    return this._user.asReadonly();
  }
  public get isAuthenticated() {
    return this._isAuthenticated.asReadonly();
  }
  public get baseURL() {
    return this._baseURL;
  }
  public set baseURL(value: string) {
    this._baseURL = value;
  }
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {
    console.log('UserService is created!', this.baseURL);
  }

  public init() {
    this._isAuthenticated.set(this.cookie.get('accessToken').length > 0);
    if (this.isAuthenticated()) {
      this.http
        .get<UserModel>(this.baseURL + 'user', {
          headers: {
            Authorization: 'Bearer ' + this.cookie.get('accessToken'),
          },
        })
        .subscribe({
          next: (user: UserModel) => {
            this._user.set(user);
            this._isAuthenticated.set(true);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  public login(email: string, password: string) {
    this.http
      .post(this.baseURL + 'auth/login', {
        password,
        email,
      })
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        catchError((error) => {
          return throwError(() => {
            return error.error.message;
          });
        })
      )
      .subscribe({
        next: (data: { token: string; user: UserModel }) => {
          console.log(data);

          this._user.set(data.user);
          this.cookie.set('accessToken', data.token, {
            path: '/',
            expires: 29,
          });
          this._isAuthenticated.set(true);
          this.router.navigate(['/']);
        },
        error: (errorMessage: string) => {
          if (errorMessage === UserErrors.UDNE) {
            console.log('USER DOESNT EXIST');
          } else if (errorMessage === UserErrors.EMIR) {
            console.log('EMAIL IS REQUIRED');
          } else if (errorMessage === UserErrors.UPNM) {
            console.log('USER PASSWORDS DOESNT MATCH');
          }
        },
      });
  }
  public signup(details: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    address: string;
    pinCode: number;
  }) {
    this.http
      .post(this.baseURL + 'auth/register', details)
      .pipe(
        catchError((error) => {
          error = error.error;
          return throwError(() => {
            if (error.message === '') {
            }
          });
        })
      )
      .subscribe({
        next: (resData) => {
          console.log(resData);
        },
        error: (errorMessage: string) => {},
      });
  }
  public logout() {
    this.cookie.delete('accessToken');
    this._isAuthenticated.set(false);
    this._user.set({
      UUID: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      pinCode: 0,
      role: '',
    });
    this.router.navigate(['']);
  }
}
