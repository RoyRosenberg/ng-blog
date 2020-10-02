import { Action, createReducer, on } from '@ngrx/store';

import { ProjectActions } from '.';
import { ProjectState } from './state';

export const initState: ProjectState = {
    fetching: false,
    projects: []
};

const customerReducer = createReducer(initState,
    on(ProjectActions.LoadProjects, state => ({
        ...state,
        fetching: true
    })),
    on(ProjectActions.LoadProjectsSuccess, (state, payload) => ({
        ...state,
        projects: payload.projects,
        fetching: false
    })),
    on(ProjectActions.LoadProjectsFailed, state => ({
        ...state,
        fetching: false,
        projects: []
    })),
);

export function reducer(state: ProjectState | undefined, action: Action) {
    return customerReducer(state, action);
}

