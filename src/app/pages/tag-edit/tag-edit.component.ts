import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tag } from 'src/app/models/tag';
import { AppState } from 'src/app/store/appState';

import * as tags from '../../store/tag';
import { ActivatedRoute } from '@angular/router';
import { TagSelectors } from '../../store/tag';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {
  tag$: Observable<Tag>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.tag$ = store.select(TagSelectors.getSelectedTag);
    route.params.subscribe(params => {
      const tagId = +params.id || 0;
      store.dispatch(tags.TagActions.SetSelectedTag({ tagId }));
    });
  }

  ngOnInit() {
  }

  saveTag(tag: Tag) {
    this.store.dispatch(tags.TagActions.CreateOrUpdateTag({ tag }));
  }
}
