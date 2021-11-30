import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};
export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHNETICATED_SUCCESS:
      const { email, id, token, expirationDate } = action.payload;
      const user = new User(email, id, token, expirationDate);
      return { ...state, user: user, authEror: null, loading: false };
    case AuthActions.LOGOUT:
      return { ...state, user: null };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return { ...state, authError: null, loading: true };
    case AuthActions.AUTHNETICATED_FAIL:
      return { ...state, authError: action.payload, loading: false };
    case AuthActions.CLEAR_ERROR:
      return { ...state, authError: null };

    default:
      return state;
  }
}
