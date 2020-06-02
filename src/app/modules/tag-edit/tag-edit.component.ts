import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tag } from 'src/app/shared/models/tag';
import { AppState } from 'src/app/store/appState';

import * as tags from '../../store/tag';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {
  tag = new Tag();
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  saveTag(tag: Tag) {
    this.store.dispatch(new tags.TagActions.CreateTag(tag));
  }
}
