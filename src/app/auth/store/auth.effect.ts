import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    id: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
  let errorMsg = 'An error occured';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthtenticateFail(errorMsg));
  }
  console.log(errorRes.error.error.message);

  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMsg = 'This email is exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMsg = 'User not registered';
      break;
    case 'INVALID_PASSWORD':
      errorMsg = 'Invalid Password';
      break;
  }
  return of(new AuthActions.AuthtenticateFail(errorMsg));
};
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable()
export class AuthEffects {
  authSignup$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.firebaseAPIKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                resData.expiresIn
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    );
  });

  authLogin$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.LOGIN_START),
      mergeMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                resData.expiresIn
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExprationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return { type: 'DUMMY' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          // new Date()
          new Date(userData._tokenExprationDate)
        );
        const expirationDate =
          new Date(userData._tokenExprationDate).getTime() -
          new Date().getTime();
        if (loadedUser.token) {
          this.authService.setLogutTimer(expirationDate);

          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            id: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExprationDate),
            redirect: false,
          });
        }
        return { type: 'DUMMY' };
      })
    );
  });
  autRedirect$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActions.AUTHNETICATED_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
          if (authSuccessAction.payload.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );
  authLogout$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.router.navigate(['/auth']);
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
