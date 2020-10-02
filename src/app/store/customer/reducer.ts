import { Action, createReducer, on } from '@ngrx/store';

import { CustomerActions } from '.';
import { CustomerState } from './state';

export const initState: CustomerState = {
    fetching: false,
    customers: [],
    selectedCustomerId: 0
};

const customerReducer = createReducer(initState,
    on(CustomerActions.LoadCustomers, state => ({
        ...state,
        fetching: true
    })),
    on(CustomerActions.UpdateCustomer, state => ({
        ...state,
        fetching: true
    })),
    on(CustomerActions.LoadCustomersSuccess, (state, payload) => ({
        ...state,
        customers: payload.customers,
        fetching: false
    })),
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
    on(CustomerActions.UpdateCustomerSuccess, (state, payload) => {
        const custList = [...state.customers];
        const filtered = custList.filter(t => t.id === payload.customer.id);
        const index = custList.indexOf(filtered[0]);
        custList[index] = payload.customer;
        return {
            ...state,
            fetching: false,
            customers: custList
        };
    }),
);

export function reducer(state: CustomerState | undefined, action: Action) {
    return customerReducer(state, action);
}
