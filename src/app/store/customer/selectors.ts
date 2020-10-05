import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter } from './reducer';
import { CustomerState } from './state';

const getCustomersFeatureState = createFeatureSelector<CustomerState>('customers');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();


export const getCustomers = createSelector(
    getCustomersFeatureState,
    selectAll);

export const getFetchingInProgress = createSelector(
    getCustomersFeatureState,
    state => state.fetching
);

export const getSelectedCustomerId = createSelector(
    getCustomersFeatureState,
    state => state.selectedCustomerId
);

export const getSelectedCustomer = createSelector(
    getCustomers,
    getSelectedCustomerId,
    (customers, id) => {
        const filtered = customers.filter(c => c.id === id);
        if (filtered.length > 0) {
            return filtered[0];
        } else if (customers.length === 0) {
            return null;
        } else {
            return undefined;
        }
    }
);
