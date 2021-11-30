import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  // login(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  //       environment.firebaseAPIKey,
  //     { email, password, returnSecureToken: true }
  //   );
  // }

  // signup(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  //       environment.firebaseAPIKey,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true,
  //     }
  //   );
  // }
  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExprationDate: string;
  //   } = JSON.parse(localStorage.getItem('userData'));

  //   if (!userData) {
  //     return;
  //   }

  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     // new Date()
  //     new Date(userData._tokenExprationDate)
  //   );
  //   if (loadedUser.token) {
  //     const expirationDuration =
  //       new Date(userData._tokenExprationDate).getTime() - new Date().getTime();

  //     this.store.dispatch(
  //       new AuthActions.AuthenticateSuccess({
  //         email: loadedUser.email,
  //         id: loadedUser.id,
  //         token: loadedUser.token,
  //         expirationDate: new Date(userData._tokenExprationDate),
  //       })
  //     );
  //     // this.user.next(loadedUser);

  //     this.autoLogout(expirationDuration);
  //   }
  // }

  setLogutTimer(expirationDuration: number) {
    this.tokenExpTimer = setTimeout(
      () => this.store.dispatch(new AuthActions.Logout()),
      expirationDuration
    );
  }
  clearLogoutTimer() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
      this.tokenExpTimer = null;
    }
  }
  //   private handleAuthentication(
  //     email: string,
  //     userId: string,
  //     token: string,
  //     expiresIn: number
  //   ) {
  //     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //     const user = new User(email, userId, token, expirationDate);
  //     // this.user.next(user);
  //     this.store.dispatch(
  //       new AuthActions.AuthenticateSuccess({
  //         email: email,
  //         id: userId,
  //         token: token,
  //         expirationDate: expirationDate,
  //       })
  //     );
  //     this.autoLogout(expiresIn * 1000);
  //     localStorage.setItem('userData', JSON.stringify(user));
  //   }

  //   private handleError(errorRes: HttpErrorResponse) {
  //     let errorMsg = 'An error occured';
  //     if (!errorRes.error || !errorRes.error.error) {
  //       return throwError(() => errorMsg);
  //     }
  //     switch (errorRes.error.error.message) {
  //       case 'EMAIL_EXISTS':
  //         errorMsg = 'This email exists already';
  //       case 'EMAIL_NOT_FOUND':
  //         errorMsg = 'User not registered';
  //       case 'INVALID_PASSWORD':
  //         errorMsg = 'Invalid Password';
  //     }
  //     return throwError(() => errorMsg);
  //   }
}
