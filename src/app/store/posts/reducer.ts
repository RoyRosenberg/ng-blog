import { PostActionTypes, PostsActions } from './actions';
import { PostState } from './state';

const from = new Date();
from.setDate(from.getDate() - 300);

export const initState: PostState = {
    fetching: false,
    posts: [],
    filter: {
        userName: '',
        customer: '',
        fromDate: from,
        toDate: new Date(),
        tags: [],
        postsPerPage: 10,
        pageIndexToFetch: 1,
    },
    postsPerPage: 0,
    currentPage: 0,
    totalPages: 0,
    totalPostCount: 0
};

export function postsReducer(state: PostState = initState, action: PostsActions): PostState {
    console.log('in post reducer:', action);
    switch (action.type) {
        case PostActionTypes.GetPosts:
            return {
                ...state,
                fetching: true,
                filter: action.payload
            };
        case PostActionTypes.GetPostsSuccess:
            // console.log('post filtered OK', action.payload);
            // const copyPostMap = new Map(state.posts);
            // const copyPostMap = new Map<number, Post[]>();
            // copyPostMap.set(action.payload.currentPage, action.payload.posts);
            // console.log('post are map', copyPostMap);
            return {
                ...state,
                posts: action.payload.items,
                currentPage: action.payload.currentPage,
                postsPerPage: action.payload.itemsPerPage,
                totalPages: action.payload.totalPages,
                totalPostCount: action.payload.totalItemCount,
                fetching: false
            };
        case PostActionTypes.GetPostsFailed:
            return {
                ...state,
                fetching: false
            };
        default:
            return state;
    }
}
