import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Tag } from 'src/app/models/tag';

import * as TagsActions from './actions';
import { TagState } from './state';

export const adapter: EntityAdapter<Tag> = createEntityAdapter<Tag>({});

export const initState: TagState = adapter.getInitialState({
    fetching: false,
    selectedTag: null,
});

const tagsReducer = createReducer(initState,
    on(TagsActions.LoadTags, state => ({
        ...state,
        fetching: true
    })),
    on(TagsActions.CreateOrUpdateTag, state => ({
        ...state,
        fetching: true
    })),
    on(TagsActions.DeleteTag, state => ({
        ...state,
        fetching: true
    })),
    on(TagsActions.LoadTagsSuccess, (state, payload) =>
        adapter.setAll(payload.tags, { ...state, fetching: false })),
    on(TagsActions.LoadTagsFailed, state => ({
        ...state,
        fetching: false,
        tags: []
    })),
    on(TagsActions.CreateOrUpdateTagSuccess, (state, payload) =>
        adapter.upsertOne(payload.tag, { ...state, fetching: false, selectedTag: 0 })
    ),
    on(TagsActions.CreateOrUpdateTagFailed, state => ({
        ...state,
        fetching: false,
        selectedTag: 0
    })),
    on(TagsActions.SetSelectedTag, (state, payload) => ({
        ...state,
        selectedTag: payload.tagId
    })),
    on(TagsActions.DeleteTagSuccess, (state, payload) =>
        adapter.removeOne(payload.tagId, { ...state, fetching: false })
    ),
    on(TagsActions.DeleteTagFailed, state => ({
        ...state,
        fetching: false
    })),
);

export function reducer(state: TagState | undefined, action: Action) {
    return tagsReducer(state, action);
}

