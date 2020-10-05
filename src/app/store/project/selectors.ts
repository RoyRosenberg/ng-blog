import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as customerStore from 'src/app/store/customer';

import { getSelectedCustomer } from '../customer/selectors';
import { adapter } from './reducer';
import { ProjectState } from './state';

const getProjectsFeatureState = createFeatureSelector<ProjectState>('projects');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const getProjects = createSelector(
    getProjectsFeatureState,
    customerStore.CustomerSelectors.getCustomers,
    (state, customers) => {
        const projects = selectAll(state);
        return projects.map(p => {
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
    (state, customer) => {
        const projects = selectAll(state);
        return customer !== null ? projects.filter(p => p.customerId === customer.id) : [];
    }
);
