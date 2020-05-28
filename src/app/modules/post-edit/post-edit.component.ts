import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/models/customer';
import { Project } from 'src/app/shared/models/project';
import { Tag } from 'src/app/shared/models/tag';
import { User } from 'src/app/shared/models/user';
import { AppState } from 'src/app/store/appState';
import { getCustomers } from 'src/app/store/customer/selectors';
import { getProjects } from 'src/app/store/project/selectors';
import { getTags } from 'src/app/store/tag/selectors';
import { getUsers } from 'src/app/store/user/selectors';

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

  constructor(private store: Store<AppState>) {
    this.users$ = store.select(getUsers);
    this.customers$ = store.select(getCustomers);
    this.tags$ = store.select(getTags);
    this.projects$ = store.select(getProjects);
   }

  ngOnInit() {
  }

}
