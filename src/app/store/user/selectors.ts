import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from './state';

const getUsersFeatureState = createFeatureSelector<UserState>('users');

export const getUsers = createSelector(
    getUsersFeatureState,
    state => state.users
);
export const getFetchingInProgress = createSelector(
    getUsersFeatureState,
    state => state.fetching
);
