import { Project } from 'src/app/shared/models/project';

export interface ProjectState {
    fetching: boolean;
    projects: Project[];
}
