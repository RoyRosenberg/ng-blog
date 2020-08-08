import { Tag } from 'src/app/models/tag';

export interface TagState {
    fetching: boolean;
    tags: Tag[];
    selectedTag: Tag | null;
}
