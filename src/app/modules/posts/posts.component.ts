import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/models/Post';
import { AppState } from 'src/app/store/appState';

import { PostActions, PostSelectors } from '../../store/posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  inProgress$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(PostSelectors.getPosts);
    this.inProgress$ = this.store.select(PostSelectors.getFetchingInProgress);
    this.store.dispatch(new PostActions.LoadPosts());
  }


}
