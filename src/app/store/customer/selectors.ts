import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CustomerState } from './state';

const getCustomersFeatureState = createFeatureSelector<CustomerState>('customers');


export const getCustomers = createSelector(
    getCustomersFeatureState,
    state => state.customers
);

export const getFetchingInProgress = createSelector(
    getCustomersFeatureState,
    state => state.fetching
);
