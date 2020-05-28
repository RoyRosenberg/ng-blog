import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/models/customer';
import { User } from 'src/app/shared/models/user';
import { AppState } from 'src/app/store/appState';
import { getCustomers } from 'src/app/store/customer/selectors';
import { getUsers } from 'src/app/store/user/selectors';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  users$: Observable<User[]>;
  customers$: Observable<Customer[]>;

  constructor(private store: Store<AppState>) {
    this.users$ = store.select(getUsers);
    this.customers$ = store.select(getCustomers);
   }

  ngOnInit() {
  }

}
