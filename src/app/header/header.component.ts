import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();

  collapsed = true;
  authSubs: Subscription;
  isAuthenticated: boolean = false;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authSubs = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  onSaveData() {
    // this.dataStorageService.storeRecipe();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }
  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }
}
