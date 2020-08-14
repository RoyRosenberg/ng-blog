import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/store/appState';
import { UserSelectors } from 'src/app/store/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private store: Store<AppState>) {
    this.users$ = store.select(UserSelectors.getUsers);
   }

  ngOnInit() {
  }

}
