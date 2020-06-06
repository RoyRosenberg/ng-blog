import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getSelectedCustomer } from '../customer/selectors';
import { ProjectState } from './state';

const getProjectsFeatureState = createFeatureSelector<ProjectState>('projects');

export const getProjects = createSelector(
    getProjectsFeatureState,
    state => state.projects
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
