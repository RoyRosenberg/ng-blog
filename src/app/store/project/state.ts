import { EntityState } from '@ngrx/entity';
import { Project } from 'src/app/models/project';

export interface ProjectState extends EntityState<Project> {
    fetching: boolean;
}
