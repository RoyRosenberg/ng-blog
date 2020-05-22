import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostState } from './state';

const getPostsFeatureState = createFeatureSelector<PostState>('posts');
export const getPosts = createSelector(
    getPostsFeatureState,
    state => state.posts
);
export const getFetchingInProgress = createSelector(
    getPostsFeatureState,
    state => state.fetching
);
