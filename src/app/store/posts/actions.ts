import { Action } from '@ngrx/store';
import { Post } from 'src/app/shared/models/Post';
import { PagingResponse, PostFilter } from 'src/app/shared/models/postFilter';

import { initState } from './reducer';

export enum PostActionTypes {
    GetPosts = '[Post] Get Posts',
    GetPostsSuccess = '[Post] Get Posts Success',
    GetPostsFailed = '[Post] Get Posts Failed',
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


export type PostsActions = LoadPosts
    | LoadPostsSuccess
    | LoadPostsFailed;
