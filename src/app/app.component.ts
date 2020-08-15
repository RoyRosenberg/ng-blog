import { Component, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
  constructor(store: Store<AppState>, private mediaObserver: MediaObserver,
              private router: Router, private activatedRoute: ActivatedRoute,
              private titleService: Title) {
    store.dispatch(new UserActions.LoadUsers());
    store.dispatch(new CustomerActions.LoadCustomers());
    store.dispatch(new ProjectActions.LoadProjects());
    store.dispatch(new TagActions.LoadTags());
    this.mediaSub = this.mediaObserver.media$
      .subscribe((change: MediaChange) => {
        console.log(change.mqAlias);
      });

    // Set title
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data.title) {
            return child.snapshot.data.title;
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.titleService.setTitle(`Capito Blog | ${data}`);
      }
    });
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}
