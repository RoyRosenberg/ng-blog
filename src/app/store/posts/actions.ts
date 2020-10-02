import { Action } from '@ngrx/store';
import { Post } from 'src/app/models/Post';
import { PagingResponse, PostFilter } from 'src/app/models/postFilter';

import { initState } from './reducer';

export enum PostActionTypes {
    GetPosts = '[Post] Get Posts',
    GetPostsSuccess = '[Post] Get Posts Success',
    GetPostsFailed = '[Post] Get Posts Failed',

    CreateOrUpdatePost = '[Post] Create or Update',
    CreateOrUpdatePostFailed = '[Post] Create or Update Failed',
    CreateOrUpdatePostSuccess = '[Post] Create or Update Success'
}

export class LoadPosts implements Action {
    readonly type = PostActionTypes.GetPosts;
    constructor(public payload: PostFilter = initState.filter) { }
}

export class LoadPostsSuccess implements Action {
    readonly type = PostActionTypes.GetPostsSuccess;
    constructor(public payload: PagingResponse<Post>) { }
}

export class LoadPostsFailed implements Action {
    readonly type = PostActionTypes.GetPostsFailed;
}

export class CreateOrUpdatePost implements Action {
    readonly type = PostActionTypes.CreateOrUpdatePost;
    constructor(public payload: Post) { }
}

export class CreateOrUpdatePostSuccess implements Action {
    readonly type = PostActionTypes.CreateOrUpdatePostSuccess;
    constructor(public payload: Post) { }
}

export class CreateOrUpdatePostFailed implements Action {
    readonly type = PostActionTypes.CreateOrUpdatePostFailed;
}

export type PostsActions = LoadPosts
    | LoadPostsSuccess
    | LoadPostsFailed
    | CreateOrUpdatePost
    | CreateOrUpdatePostSuccess
    | CreateOrUpdatePostFailed;
