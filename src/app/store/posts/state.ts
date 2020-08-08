import { Post } from 'src/app/models/Post';
import { PostFilter } from 'src/app/models/postFilter';


export interface PostState {
    fetching: boolean;
    posts: Post[];
    filter: PostFilter;
    postsPerPage: number;
    currentPage: number;
    totalPages: number;
    totalPostCount: number;
}
