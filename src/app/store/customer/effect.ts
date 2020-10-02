import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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

    loadCustomers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomerActions.LoadCustomers),
            mergeMap(combined =>
                this.custService.getCustomers()
                    .pipe(
                        map(res => CustomerActions.LoadCustomersSuccess({ customers: res })),
                        catchError((err) => {
                            console.log(err);
                            return of(CustomerActions.LoadCustomersFailed());
                        })
                    )
            )
        ));

    updateCustomer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomerActions.UpdateCustomer),
            mergeMap(action =>
                this.custService.updateCustomer(action.customer)
                    .pipe(
                        map(res => CustomerActions.UpdateCustomerSuccess({ customer: action.customer })),
                        tap(res => {
                            this.router.navigate(['/customers/list']);
                            this.alertService.success('Customer Updated!✨🎉');
                        }),
                        catchError((err) => {
                            console.log(err);
                            return of(CustomerActions.UpdateCustomerFailed());
                        })
                    )
            )
        )
    );
}
