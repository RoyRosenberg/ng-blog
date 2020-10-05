import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from 'src/app/models/customer';

import * as CustomerActions from './actions';
import { CustomerState } from './state';

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({});

export const initState: CustomerState = adapter.getInitialState({
    fetching: false,
    selectedCustomerId: 0
});

const customerReducer = createReducer(initState,
    on(CustomerActions.LoadCustomers, state => ({
        ...state,
        fetching: true
    })),
    on(CustomerActions.UpdateCustomer, state => ({
        ...state,
        fetching: true
    })),
    on(CustomerActions.LoadCustomersSuccess, (state, payload) =>
        adapter.setAll(payload.customers, { ...state, fetching: false })),
    on(CustomerActions.LoadCustomersFailed, state => ({
        ...state,
        fetching: false
    })),
    on(CustomerActions.SelectCustomer, (state, payload) => ({
        ...state,
        fetching: false,
        selectedCustomerId: payload.id
    })),
    on(CustomerActions.UpdateCustomerFailed, state => ({
        ...state,
        fetching: false
    })),
    on(CustomerActions.UpdateCustomerSuccess, (state, payload) =>
        adapter.upsertOne(payload.customer, { ...state, fetching: false })
    )
);

export function reducer(state: CustomerState | undefined, action: Action) {
    return customerReducer(state, action);
}
