import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';

import { CustomerActions } from '../customer';

@Injectable()
export class CustomerEffects {
    constructor(
        private actions$: Actions,
        private custService: CustomerService
    ) { }

    @Effect()
    loadCustomers$ = this.actions$.pipe(
        tap(() => console.log('In customer Effect')),
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
}
