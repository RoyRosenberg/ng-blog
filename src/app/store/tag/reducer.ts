import { Action, createReducer, on } from '@ngrx/store';

import * as TagsActions from './actions';
import { TagState } from './state';

export const initState: TagState = {
    fetching: false,
    tags: [],
    selectedTag: null,
};

const tagsReducer = createReducer(initState,
    on(TagsActions.LoadTags, state => ({
        ...state,
        fetching: true
    })),
    on(TagsActions.CreateTag, state => ({
        ...state,
        fetching: true
    })),
    on(TagsActions.DeleteTag, state => ({
        ...state,
        fetching: true
    })),
    on(TagsActions.LoadTagsSuccess, (state, payload) => ({
        ...state,
        tags: payload.tags,
        fetching: false
    })),
    on(TagsActions.LoadTagsFailed, state => ({
        ...state,
        fetching: false,
        tags: []
    })),
    on(TagsActions.CreateTagSuccess, (state, payload) => {
        const arr = [...state.tags, payload.tag];
        return {
            ...state,
            fetching: false,
            tags: arr
        };
    }),
    on(TagsActions.CreateTagFailed, state => ({
        ...state,
        fetching: false,
    })),
    on(TagsActions.UpdateTag, (state, payload) => ({
        ...state,
        fetching: true,
        selectedTag: payload.tag
    })),
    on(TagsActions.UpdateTagSuccess, (state, payload) => {
        const tagList = [...state.tags];
        const filtered = tagList.filter(t => t.id === state.selectedTag.id);
        const index = tagList.indexOf(filtered[0]);
        tagList[index] = state.selectedTag;
        return {
            ...state,
            fetching: false,
            tags: tagList
        };
    }),
    on(TagsActions.UpdateTagFailed, state => ({
        ...state,
        fetching: false,
    })),
    on(TagsActions.InitSelectedTag, state => ({
        ...state,
        selectedTag: { id: 0, name: '', color: '' },
    })),
    on(TagsActions.SetSelectedTagSuccess, (state, payload) => ({
        ...state,
        selectedTag: payload.tag
    })),
    on(TagsActions.DeleteTagSuccess, (state, payload) => {
        const newTagArr = [...state.tags];
        const tagsToDelete = newTagArr.filter(t => t.id === payload.tagId);
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
    }),
    on(TagsActions.DeleteTagFailed, state => ({
        ...state,
        fetching: false
    })),
    on(TagsActions.DeleteTagCancelled, state => ({
        ...state,
        fetching: false
    })),
);

export function reducer(state: TagState | undefined, action: Action) {
    return tagsReducer(state, action);
}

