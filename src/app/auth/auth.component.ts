import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoaded: boolean = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    let authObs: Observable<AuthResponseData>;

    this.isLoaded = true;
    if (this.isLoginMode) {
      //...
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      (responseData) => {
        this.isLoaded = false;
        this.router.navigate(['/recipes']);
      },
      (errorMsg) => {
        this.error = errorMsg;
        this.isLoaded = false;
      }
    );
    form.reset();
  }
}
