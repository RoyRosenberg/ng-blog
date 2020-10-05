import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';

import * as UserActions from './actions';
import { UserState } from './state';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({});

export const initState: UserState = adapter.getInitialState({
    fetching: false,
    selectedUser: 0,
    disabled: false
});

const usersReducer = createReducer(initState,
    on(UserActions.LoadUsers, state => ({
        ...state,
        fetching: true
    })),
    on(UserActions.LoadUsersSuccess, (state, payload) =>
        adapter.setAll(payload.users, { ...state, fetching: false })
    ),
    on(UserActions.LoadUsersFailed, state => ({
        ...state,
        fetching: false
    })),
    on(UserActions.SetSelectedUser, (state, payload) => ({
        ...state,
        selectedUser: payload.userId
    })),
    // on(UserActions.InitSelectedUser, state => ({
    //     ...state,
    //     selectedUser: { userName: '', email: '', id: 0, color: '', disabled: false }
    // })),
    // on(UserActions.SetSelectedUserSuccess, (state, payload) => ({
    //     ...state,
    //     selectedUser: payload.user
    // })),
    on(UserActions.CreateOrUpdateUser, state => ({
        ...state,
        fetching: true
    })),
    on(UserActions.CreateOrUpdateUserFailed, state => ({
        ...state,
        fetching: false
    })),
    on(UserActions.CreateOrUpdateUserSuccess, (state, payload) =>
        adapter.upsertOne(payload.user, { ...state, fetching: false })
    ),
);

export function reducer(state: UserState | undefined, action: Action) {
    return usersReducer(state, action);
}

