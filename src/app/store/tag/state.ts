import { EntityState } from '@ngrx/entity';
import { Tag } from 'src/app/models/tag';

export interface TagState extends EntityState<Tag> {
    fetching: boolean;
    selectedTag: number;
}
