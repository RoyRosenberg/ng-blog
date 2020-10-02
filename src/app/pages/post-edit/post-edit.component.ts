import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { Post } from 'src/app/models/Post';
import { Project } from 'src/app/models/project';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/store/appState';
import { CustomerSelectors } from 'src/app/store/customer';
import { PostActions } from 'src/app/store/posts';
import { ProjectSelectors } from 'src/app/store/project';
import { TagSelectors } from 'src/app/store/tag';
import { UserSelectors } from 'src/app/store/user';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  users$: Observable<User[]>;
  customers$: Observable<Customer[]>;
  tags$: Observable<Tag[]>;
  projects$: Observable<Project[]>;
  usersLoading$: Observable<boolean>;
  tagsLoading$: Observable<boolean>;
  projectsLoading$: Observable<boolean>;
  customersLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.usersLoading$ = store.select(UserSelectors.getFetchingInProgress);
    this.tagsLoading$ = store.select(TagSelectors.getFetchingInProgress);
    this.projectsLoading$ = store.select(ProjectSelectors.getFetchingInProgress);
    this.customersLoading$ = store.select(CustomerSelectors.getFetchingInProgress);

    this.users$ = store.select(UserSelectors.getUsers);
    this.projects$ = store.select(ProjectSelectors.getProjects);
    this.customers$ = store.select(CustomerSelectors.getCustomers);
    this.tags$ = store.select(TagSelectors.getTags);

  }

  ngOnInit() {
  }

  savePost(post: Post) {
    console.log('post is about to be saved', post);
    this.store.dispatch(new PostActions.CreateOrUpdatePost(post));
  }
}
