import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Project } from 'src/app/models/project';

import * as ProjectActions from './actions';
import { ProjectState } from './state';

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>({});

export const initState: ProjectState = adapter.getInitialState({ fetching: false });

const customerReducer = createReducer(initState,
    on(ProjectActions.LoadProjects, state => ({
        ...state,
        fetching: true
    })),
    on(ProjectActions.LoadProjectsSuccess, (state, payload) =>
        adapter.setAll(payload.projects, { ...state, fetching: false })
    ),
    on(ProjectActions.LoadProjectsFailed, state =>
        adapter.removeAll({ ...state, fetching: false })
    ),
);

export function reducer(state: ProjectState | undefined, action: Action) {
    return customerReducer(state, action);
}

