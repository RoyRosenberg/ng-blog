import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as customerStore from 'src/app/store/customer';

import { getSelectedCustomer } from '../customer/selectors';
import { ProjectState } from './state';

const getProjectsFeatureState = createFeatureSelector<ProjectState>('projects');

export const getProjects = createSelector(
    getProjectsFeatureState,
    customerStore.CustomerSelectors.getCustomers,
    (state, customers) => {
        return state.projects.map(p => {
            const proj = { ...p };
            const cust = customers.find(c => c.id === proj.customerId);
            if (cust) {
                proj.customer = cust;
            } else {
                proj.customer = { id: 0, company: 'loading', contact: 'loading', phone: '', address: '', color: '' };
            }
            return proj;
        });
    }
);
export const getFetchingInProgress = createSelector(
    getProjectsFeatureState,
    state => state.fetching
);

export const getProjectBySelectedCustomer = createSelector(
    getProjectsFeatureState,
    getSelectedCustomer,
    (state, customer) =>
        customer !== null ? state.projects.filter(p => p.customerId === customer.id) : []
);
