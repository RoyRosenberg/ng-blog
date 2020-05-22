import { Post } from 'src/app/shared/models/Post';

export interface PostState {
    fetching: boolean;
    posts: Post[];
    totalPages: number;
    itemsPerPage: number;
    currentPage: number;
    fetchedPages: number[];
}
