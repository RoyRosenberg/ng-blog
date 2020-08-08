import { Action } from '@ngrx/store';
import { Project } from 'src/app/models/project';


export enum ProjectActionTypes {
    GetProjects = '[Project] Get Projects',
    GetProjectsSuccess = '[Project] Get Projects Success',
    GetProjectsFailed = '[Project] Get Projects Failed',
}

export class LoadProjects implements Action {
    readonly type = ProjectActionTypes.GetProjects;
    constructor() { }
}

export class LoadProjectsSuccess implements Action {
    readonly type = ProjectActionTypes.GetProjectsSuccess;

    constructor(public payload: Project[]) { }
}

export class LoadProjectsFailed implements Action {
    readonly type = ProjectActionTypes.GetProjectsFailed;
}


export type ProjectsActions = LoadProjects
    | LoadProjectsSuccess
    | LoadProjectsFailed;
