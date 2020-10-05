import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/models/Post';

import * as PostActions from './actions';
import { PostState } from './state';

const from = new Date();
from.setDate(from.getDate() - 300);

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({});

export const initState: PostState = adapter.getInitialState({
    fetching: false,
    filter: {
        userId: 0,
        customerId: 0,
        fromDate: from,
        toDate: new Date(),
        tags: [],
        postsPerPage: 10,
        pageIndexToFetch: 0,
    },
    postsPerPage: 10,
    currentPage: 1,
    totalPages: 0,
    totalPostCount: 0
});

const postsReducer = createReducer(
    initState,
    on(PostActions.LoadPosts, (state, payload) => ({
        ...state,
        fetching: true,
        filter: payload.filter ? payload.filter : initState.filter
    })),
    on(PostActions.LoadPostsSuccess, (state, payload) =>
        adapter.setAll(payload.pagingResponse.items, {
            ...state,
            currentPage: payload.pagingResponse.currentPage,
            postsPerPage: payload.pagingResponse.itemsPerPage,
            totalPages: payload.pagingResponse.totalPages,
            totalPostCount: payload.pagingResponse.totalItemCount,
            fetching: false
        })),
    on(PostActions.LoadPostsFailed, state => ({
        ...state,
        fetching: false
    })),
    on(PostActions.CreateOrUpdatePost, state => ({
        ...state,
        fetching: true
    })),
    on(PostActions.CreateOrUpdatePostSuccess, (state, payload) =>
        adapter.upsertOne(payload.post, { ...state, fetching: false })
    ),
    on(PostActions.CreateOrUpdatePostFailed, state => ({
        ...state,
        fetching: false,
    }))
);

export function reducer(state: PostState | undefined, action: Action) {
    return postsReducer(state, action);
}
