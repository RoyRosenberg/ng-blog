import { PostActionTypes, PostsActions } from './actions';
import { PostState } from './state';

const initState: PostState = {
    fetching: false,
    posts: [],
    totalPages: 0,
    itemsPerPage: 10,
    currentPage: 0,
    fetchedPages: []
};

export function postsReducer(state: PostState = initState, action: PostsActions): PostState {
    console.log('in post reducer:', action);
    switch (action.type) {
        case PostActionTypes.GetPosts:
            return {
                ...state,
                fetching: true
            };
        case PostActionTypes.GetPostsSuccess:
            return {
                ...state,
                posts: action.payload,
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
