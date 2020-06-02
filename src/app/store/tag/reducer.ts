import { TagActionTypes, TagsActions } from './actions';
import { TagState } from './state';
import { Tag } from 'src/app/shared/models/tag';

export const initState: TagState = {
    fetching: false,
    tags: [],
    selectedTag: null,
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
        case TagActionTypes.UpdateTag:
            return {
                ...state,
                fetching: true,
                selectedTag: action.payload
            };
        case TagActionTypes.UpdateTagSuccess:
            const tagList = [...state.tags];
            const filtered = tagList.filter(t => t.id === state.selectedTag.id);
            const index = tagList.indexOf(filtered[0]);
            tagList[index] = state.selectedTag;
            return {
                ...state,
                fetching: false,
                tags: tagList
            };
        case TagActionTypes.UpdateTagFailed:
            return {
                ...state,
                fetching: false,
            };
        case TagActionTypes.InitSelectedTag:
            return {
                ...state,
                selectedTag: { id: 0, name: '', color: '' },
            };
        case TagActionTypes.SetSelectedTagSuccess:
            return {
                ...state,
                selectedTag: action.payload
            };
        default:
            return state;
    }
}
