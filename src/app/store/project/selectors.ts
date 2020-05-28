import { createFeatureSelector, createSelector } from '@ngrx/store';

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
