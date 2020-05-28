import { ProjectActionTypes, ProjectsActions } from './actions';
import { ProjectState } from './state';

export const initState: ProjectState = {
    fetching: false,
    projects: []
};

export function projectsReducer(state: ProjectState = initState, action: ProjectsActions): ProjectState {
    switch (action.type) {
        case ProjectActionTypes.GetProjects:
            return {
                ...state,
                fetching: true
            };
        case ProjectActionTypes.GetProjectsSuccess:
            return {
                ...state,
                projects: action.payload,
                fetching: false
            };
        case ProjectActionTypes.GetProjectsFailed:
            return {
                ...state,
                fetching: false,
                projects: []
            };
        default:
            return state;
    }
}
