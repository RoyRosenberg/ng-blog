import { Action, createReducer, on } from '@ngrx/store';

import { UserActions } from '.';
import { UserState } from './state';

export const initState: UserState = {
    fetching: false,
    users: [],
    selectedUser: { userName: '', email: '', id: 0, color: '', disabled: false }
};

const usersReducer = createReducer(initState,
    on(UserActions.LoadUsers, state => ({
        ...state,
        fetching: true
    })),
    on(UserActions.LoadUsersSuccess, (state, payload) => ({
        ...state,
        users: payload.users,
        fetching: false
    })),
    on(UserActions.LoadUsersFailed, state => ({
        ...state,
        fetching: false,
        users: []
    })),
    on(UserActions.InitSelectedUser, state => ({
        ...state,
        selectedUser: { userName: '', email: '', id: 0, color: '', disabled: false }
    })),
    on(UserActions.SetSelectedUserSuccess, (state, payload) => ({
        ...state,
        selectedUser: payload.user
    })),
    on(UserActions.CreateOrUpdateUser, state => ({
        ...state,
        fetching: true
    })),
    on(UserActions.CreateOrUpdateUserFailed, state => ({
        ...state,
        fetching: false
    })),
    on(UserActions.CreateOrUpdateUserSuccess, (state, payload) => {
        const arr = [...state.users];
        const found = arr.find(u => u.id === payload.user.id);
        if (found) {
            // user found
            const index = arr.indexOf(found);
            arr[index] = payload.user;
        } else {
            // new user
            arr.push(payload.user);
        }
        return {
            ...state,
            users: arr,
            fetching: false
        };
    }),
);

export function reducer(state: UserState | undefined, action: Action) {
    return usersReducer(state, action);
}

