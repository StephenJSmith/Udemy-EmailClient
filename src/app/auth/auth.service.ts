import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

export interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);
  username = '';
  domain = 'angular-email.com';

  get userEmail() {
    return `${this.username}@${this.domain}`;
  }
  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    const url = this.rootUrl + '/auth/username';
    const body = { username };

    return this.http.post<UsernameAvailableResponse>(url, body);
  }

  signup(credentials: SignupCredentials) {
    const url = this.rootUrl + '/auth/signup';


    return this.http.post<SignupCredentials>(url, credentials)
      .pipe(
        tap(({ username}) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  signout() {
    const url = this.rootUrl + '/auth/signout';

    return this.http.post(url, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      );
  }

  signin(credentials: SigninCredentials) {
    const url = this.rootUrl + '/auth/signin';

    return this.http.post<SigninResponse>(url, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    const url = this.rootUrl + '/auth/signedin';

    return this.http.get<SignedInResponse>(url)
    .pipe(
      tap(({authenticated, username}) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    );
  }
}
