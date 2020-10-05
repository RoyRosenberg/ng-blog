import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TagState } from '../tag/state';
import { adapter } from './reducer';

const getTagsFeatureState = createFeatureSelector<TagState>('tags');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const getTags = createSelector(
    getTagsFeatureState,
    selectAll);

export const getFetchingInProgress = createSelector(
    getTagsFeatureState,
    state => state.fetching
);

export const getSelectedTagId = createSelector(
    getTagsFeatureState,
    state => state.selectedTag
);

export const getSelectedTag = createSelector(
    getTagsFeatureState,
    getTags,
    (state, tags) => state.selectedTag === 0 ? { id: 0, name: '', color: '' } : tags.find(t => t.id === state.selectedTag));
