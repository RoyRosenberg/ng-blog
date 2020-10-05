import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter } from './reducer';
import { UserState } from './state';

const getUsersFeatureState = createFeatureSelector<UserState>('users');

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const getUsers = createSelector(
    getUsersFeatureState,
    selectAll
);
export const getFetchingInProgress = createSelector(
    getUsersFeatureState,
    state => state.fetching
);

export const getSelectedUserId = createSelector(
    getUsersFeatureState,
    state => state.selectedUser
);

export const getSelectedUser = createSelector(
    getUsersFeatureState,
    getUsers,
    (state, users) => state.selectedUser === 0 ? { id: 0, userName: '', email: '', color: '', disabled: false }
        : users.find(u => u.id === state.selectedUser));
