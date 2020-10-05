import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { Post } from 'src/app/models/Post';
import { PagingInfo, PostFilter, PostSearchFilter } from 'src/app/models/postFilter';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/store/appState';
import { CustomerSelectors } from 'src/app/store/customer';
import { UserSelectors } from 'src/app/store/user';

import { PostActions, PostSelectors } from '../../store/posts';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;
  inProgress$: Observable<boolean>;
  postPerPage$: Observable<number>;
  postCount$: Observable<number>;
  users$: Observable<User[]>;
  customers$: Observable<Customer[]>;
  currentFilter: PostFilter;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(PostSelectors.getPosts);
    this.store.select(PostSelectors.getPosts).subscribe(p => {
      console.log('posts', p);

    });
    this.inProgress$ = this.store.select(PostSelectors.getFetchingInProgress);
    this.postPerPage$ = this.store.select(PostSelectors.getPostsPerPageCount);
    this.postCount$ = this.store.select(PostSelectors.getPostCount);
    this.store.dispatch(PostActions.LoadPosts({}));
    this.store.select(PostSelectors.getFilter).subscribe(filter => this.currentFilter = filter);
    this.users$ = this.store.select(UserSelectors.getUsers);
    this.customers$ = this.store.select(CustomerSelectors.getCustomers);

  }

  // Occurs when the user changes the pagination
  pagingChanged(paging: PagingInfo) {
    const filter: PostFilter = {
      userId: this.currentFilter.userId,
      customerId: this.currentFilter.customerId,
      fromDate: this.currentFilter.fromDate,
      toDate: this.currentFilter.toDate,
      tags: this.currentFilter.tags,

      postsPerPage: paging.itemsPerPage,
      pageIndexToFetch: paging.currentPage,
    };
    console.log('filter', filter);
    this.store.dispatch(PostActions.LoadPosts({ filter }));
  }

  // Occurs when the user presses search
  performSearch(searchFilter: PostSearchFilter) {
    console.log('searchFilter', searchFilter);
    const filter: PostFilter = {
      userId: searchFilter.userId,
      customerId: searchFilter.customerId,
      fromDate: searchFilter.fromDate,
      toDate: searchFilter.toDate,
      tags: searchFilter.tags,
      postsPerPage: this.currentFilter.postsPerPage,
      pageIndexToFetch: 1
    };
    console.log('post search', filter);
    this.store.dispatch(PostActions.LoadPosts({ filter }));
  }

}
