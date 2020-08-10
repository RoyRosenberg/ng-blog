import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { CustomerService } from 'src/app/services/customer.service';

import { CustomerActions } from '../customer';

@Injectable()
export class CustomerEffects {
    constructor(
        private actions$: Actions,
        private custService: CustomerService,
        private router: Router,
        private alertService: AlertService
    ) { }

    @Effect()
    loadCustomers$ = this.actions$.pipe(
        // tap(() => console.log('In customer Effect')),
        ofType(CustomerActions.CustomerActionTypes.GetCustomers),
        mergeMap(combined =>
            this.custService.getCustomers()
                .pipe(
                    map(res => new CustomerActions.LoadCustomersSuccess(res)),
                    catchError((err) => {
                        console.log(err);
                        return of(new CustomerActions.LoadCustomersFailed());
                    })
                )
        )
    );

    @Effect()
    updateCustomer$ = this.actions$.pipe(
        ofType<CustomerActions.UpdateCustomer>(CustomerActions.CustomerActionTypes.UpdateCustomer),
        mergeMap(action =>
            this.custService.updateCustomer(action.payload)
                .pipe(
                    map(res => new CustomerActions.UpdateCustomerSuccess(action.payload)),
                    tap(res => {
                        this.router.navigate(['/customers/list']);
                        this.alertService.success('Customer Updated!✨🎉');
                    }),
                    catchError((err) => {
                        console.log(err);
                        return of(new CustomerActions.UpdateCustomerFailed());
                    })
                )
        )
    );
}
