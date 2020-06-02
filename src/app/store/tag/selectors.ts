import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TagState } from '../tag/state';

const getTagsFeatureState = createFeatureSelector<TagState>('tags');

export const getTags = createSelector(
    getTagsFeatureState,
    state => state.tags
);

export const getFetchingInProgress = createSelector(
    getTagsFeatureState,
    state => state.fetching
);

export const getSelectedTag = createSelector(
    getTagsFeatureState,
    state => state.selectedTag
);
