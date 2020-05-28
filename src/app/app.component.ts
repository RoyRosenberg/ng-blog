import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './store/appState';
import { CustomerActions } from './store/customer';
import { ProjectActions } from './store/project';
import { TagActions } from './store/tag';
import { UserActions } from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  constructor(store: Store<AppState>){
    store.dispatch(new UserActions.LoadUsers());
    store.dispatch(new CustomerActions.LoadCustomers());
    store.dispatch(new ProjectActions.LoadProjects());
    store.dispatch(new TagActions.LoadTags());
  }
}
