import { createAction, props } from '@ngrx/store';
import { Project } from 'src/app/models/project';

export const LoadProjects = createAction('[Project] Get Projects');
export const LoadProjectsSuccess = createAction('[Project] Get Projects Success', props<{ projects: Project[] }>());
export const LoadProjectsFailed = createAction('[Project] Get Projects Failed');
