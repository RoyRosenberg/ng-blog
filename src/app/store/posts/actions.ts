import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/Post';
import { PagingResponse, PostFilter } from 'src/app/models/postFilter';

export const LoadPosts = createAction('[Post] Get Posts', props<{ filter?: PostFilter }>());
export const LoadPostsSuccess = createAction('[Post] Get Posts Success', props<{ pagingResponse: PagingResponse<Post> }>());
export const LoadPostsFailed = createAction('[Post] Get Posts Failed');

export const CreateOrUpdatePost = createAction('[Post] Create or Update', props<{ post: Post }>());
export const CreateOrUpdatePostSuccess = createAction('[Post] Create or Update Success', props<{ post: Post }>());
export const CreateOrUpdatePostFailed = createAction('[Post] Create or Update Failed');
