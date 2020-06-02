import { TagActionTypes, TagsActions } from './actions';
import { TagState } from './state';

export const initState: TagState = {
    fetching: false,
    tags: []
};

export function tagsReducer(state: TagState = initState, action: TagsActions): TagState {
    switch (action.type) {
        case TagActionTypes.GetTags:
        case TagActionTypes.CreateTag:
            return {
                ...state,
                fetching: true
            };
        case TagActionTypes.GetTagsSuccess:
            return {
                ...state,
                tags: action.payload,
                fetching: false
            };
        case TagActionTypes.GetTagsFailed:
            return {
                ...state,
                fetching: false,
                tags: []
            };
        case TagActionTypes.CreateTagSuccess:
            const arr = [...state.tags, action.payload];
            return {
                ...state,
                fetching: false,
                tags: arr
            };
        case TagActionTypes.CreateTagFailed:
            return {
                ...state,
                fetching: false,
            };
        default:
            return state;
    }
}
