import { TagActionTypes, TagsActions } from './actions';
import { TagState } from './state';

export const initState: TagState = {
    fetching: false,
    tags: [],
    selectedTag: null,
};

export function tagsReducer(state: TagState = initState, action: TagsActions): TagState {
    switch (action.type) {
        case TagActionTypes.GetTags:
        case TagActionTypes.CreateTag:
        case TagActionTypes.DeleteTag:
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
        case TagActionTypes.DeleteTagSuccess:
            const newTagArr = [...state.tags];
            const tagsToDelete = newTagArr.filter(t => t.id === action.payload);
            if (tagsToDelete.length > 0) {
                const ind = newTagArr.indexOf(tagsToDelete[0]);
                newTagArr.splice(ind, 1);
                return {
                    ...state,
                    fetching: false,
                    tags: newTagArr
                };
            } else {
                return {
                    ...state,
                    fetching: false
                };
            }

        case TagActionTypes.DeleteTagFailed:
        case TagActionTypes.DeleteTagCancelled:
            return {
                ...state,
                fetching: false
            };
        default:
            return state;
    }
}
