import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/shared/models/tag';
import { AppState } from 'src/app/store/appState';
import { TagSelectors } from 'src/app/store/tag';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  tags$: Observable<Tag[]>;
  loading$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.tags$ = store.select(TagSelectors.getTags);
    this.loading$ = store.select(TagSelectors.getFetchingInProgress);
  }

  ngOnInit() {
  }

}
