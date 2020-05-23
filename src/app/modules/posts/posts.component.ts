import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/models/Post';
import { PagingInfo, PostFilter } from 'src/app/shared/models/postFilter';
import { User } from 'src/app/shared/models/user';
import { AppState } from 'src/app/store/appState';
import { UserSelectors } from 'src/app/store/user';

import { PostActions, PostSelectors } from '../../store/posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  inProgress$: Observable<boolean>;
  postPerPage$: Observable<number>;
  postCount$: Observable<number>;
  users$: Observable<User[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(PostSelectors.getPosts);
    this.inProgress$ = this.store.select(PostSelectors.getFetchingInProgress);
    this.postPerPage$ = this.store.select(PostSelectors.getPostsPerPageCount);
    this.postCount$ = this.store.select(PostSelectors.getPostCount);
    this.store.dispatch(new PostActions.LoadPosts());

    this.users$ = this.store.select(UserSelectors.getUsers);
  }

  pagingChanged(paging: PagingInfo) {
    const filter: PostFilter = {
      userName: '',
      customer: '',
      fromDate: new Date('2015/01/01'),
      toDate: new Date(),
      tags: [],
      postsPerPage: paging.itemsPerPage,
      pageIndexToFetch: paging.currentPage,
    };
    console.log('filter', filter);
    this.store.dispatch(new PostActions.LoadPosts(filter));
  }

}
