import { Project } from 'src/app/models/project';

export interface ProjectState {
    fetching: boolean;
    projects: Project[];
}
