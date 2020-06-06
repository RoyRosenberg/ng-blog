import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/models/customer';
import { AppState } from 'src/app/store/appState';
import { CustomerActions, CustomerSelectors } from 'src/app/store/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  inProgress$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.customers$ = store.select(CustomerSelectors.getCustomers);
    this.inProgress$ = store.select(CustomerSelectors.getFetchingInProgress);
  }

  ngOnInit() {
  }

  editCustomer(custId: number) {
    this.store.dispatch(new CustomerActions.SelectCustomer(custId));
  }
}
