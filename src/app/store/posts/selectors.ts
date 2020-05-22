import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostState } from './state';

const getPostsFeatureState = createFeatureSelector<PostState>('posts');

export const getPostCount = createSelector(
    getPostsFeatureState,
    state => state.totalPostCount
);

export const getPostPageCount = createSelector(
    getPostsFeatureState,
    state => state.totalPages
);

export const getPostsPerPageCount = createSelector(
    getPostsFeatureState,
    state => state.postsPerPage
);

export const getFilter = createSelector(
    getPostsFeatureState,
    state => state.filter
);

export const getPosts = createSelector(
    getPostsFeatureState,
    state => state.posts
);
export const getFetchingInProgress = createSelector(
    getPostsFeatureState,
    state => state.fetching
);
