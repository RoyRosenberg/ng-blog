import { Tag } from 'src/app/shared/models/tag';

export interface TagState {
    fetching: boolean;
    tags: Tag[];
}
