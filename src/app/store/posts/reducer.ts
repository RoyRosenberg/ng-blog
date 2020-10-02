import { Action, createReducer, on } from '@ngrx/store';

import { PostActions } from '.';
import * as PostsActions from './actions';
import { PostState } from './state';

const from = new Date();
from.setDate(from.getDate() - 300);

export const initState: PostState = {
    fetching: false,
    posts: [],
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
};

const postsReducer = createReducer(
    initState,
    on(PostsActions.LoadPosts, (state, payload) => ({
        ...state,
        fetching: true,
        filter: payload.filter ? payload.filter : initState.filter
    })),
    on(PostActions.LoadPostsSuccess, (state, payload) => ({
        ...state,
        posts: payload.pagingResponse.items,
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
    on(PostActions.CreateOrUpdatePostSuccess, (state, payload) => {
        const arr = [...state.posts];
        const found = arr.find(p => p.id === payload.post.id);
        if (found) {
            // update post
            const index = arr.indexOf(found);
            arr[index] = payload.post;
        } else {
            // insert new post
            arr.push(payload.post);
        }
        return {
            ...state,
            fetching: false,
            posts: arr
        };
    }),
    on(PostActions.CreateOrUpdatePostFailed, state => ({
        ...state,
        fetching: false,
    }))
);

// export function postsReducer(state: PostState = initState, action: PostsActions): PostState {
//     switch (action.type) {
//         case PostActionTypes.GetPosts:
//             return {
//                 ...state,
//                 fetching: true,
//                 filter: action.payload
//             };
//         case PostActionTypes.GetPostsSuccess:
//             return {
//                 ...state,
//                 posts: action.payload.items,
//                 currentPage: action.payload.currentPage,
//                 postsPerPage: action.payload.itemsPerPage,
//                 totalPages: action.payload.totalPages,
//                 totalPostCount: action.payload.totalItemCount,
//                 fetching: false
//             };
//         case PostActionTypes.GetPostsFailed:
//             return {
//                 ...state,
//                 fetching: false
//             };
//         case PostActionTypes.CreateOrUpdatePost:
//             return {
//                 ...state,
//                 fetching: true
//             };
//         case PostActionTypes.CreateOrUpdatePostSuccess:
//             const arr = [...state.posts];
//             const found = arr.find(p => p.id === action.payload.id);
//             if (found) {
//                 // update post
//                 const index = arr.indexOf(found);
//                 arr[index] = action.payload;
//             } else {
//                 // insert new post
//                 arr.push(action.payload);
//             }
//             return {
//                 ...state,
//                 fetching: false,
//                 posts: arr
//             };
//         default:
//             return state;
//     }
// }

export function reducer(state: PostState | undefined, action: Action) {
    return postsReducer(state, action);
}
