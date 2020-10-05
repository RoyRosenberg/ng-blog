import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/store/appState';

import { UserActions, UserSelectors } from '../../store/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user$: Observable<User>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.user$ = store.select(UserSelectors.getSelectedUser);
    route.params.subscribe(params => {
      const userId = +params.id || 0;
      store.dispatch(UserActions.SetSelectedUser({ userId }));
    });
  }


  ngOnInit() {
  }

  saveUser(user: User) {
    this.store.dispatch(UserActions.CreateOrUpdateUser({ user }));
  }
}
