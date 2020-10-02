import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { Project } from 'src/app/models/project';
import { AppState } from 'src/app/store/appState';
import { CustomerActions, CustomerSelectors } from 'src/app/store/customer';
import { ProjectSelectors } from 'src/app/store/project';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer$: Observable<Customer>;
  projects$: Observable<Project[]>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
    this.customer$ = store.select(CustomerSelectors.getSelectedCustomer).pipe(
      tap(cust => {
        if (cust === undefined) {
          this.router.navigate(['customers/list']);
        }
      }
      ));
    this.projects$ = store.select(ProjectSelectors.getProjectBySelectedCustomer);
    route.params.subscribe(params => {
      const id = +params.id || 0;
      if (id !== 0) {
        store.dispatch(CustomerActions.SelectCustomer({ id }));
      }
      else { of(new Customer()); }
    });
  }

  ngOnInit() {
  }

  customerSave(customer: Customer) {
    this.store.dispatch(CustomerActions.UpdateCustomer({ customer }));
  }
}
