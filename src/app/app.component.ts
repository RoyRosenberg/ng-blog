import { Component, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

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
export class AppComponent implements OnDestroy {
  title = 'dashboard';
  mediaSub: Subscription;
  constructor(store: Store<AppState>, private mediaObserver: MediaObserver){
    store.dispatch(new UserActions.LoadUsers());
    store.dispatch(new CustomerActions.LoadCustomers());
    store.dispatch(new ProjectActions.LoadProjects());
    store.dispatch(new TagActions.LoadTags());
    this.mediaSub = this.mediaObserver.media$
      .subscribe((change: MediaChange) => {
        console.log(change.mqAlias);
      });
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}
