import { EntityState } from '@ngrx/entity';
import { Post } from 'src/app/models/Post';
import { PostFilter } from 'src/app/models/postFilter';


export interface PostState extends EntityState<Post> {
    fetching: boolean;
    filter: PostFilter;
    postsPerPage: number;
    currentPage: number;
    totalPages: number;
    totalPostCount: number;
}
