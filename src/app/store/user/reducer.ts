import { UserActionTypes, UsersActions } from './actions';
import { UserState } from './state';

export const initState: UserState = {
    fetching: false,
    users: [],
    selectedUser: { userName: '', email: '', id: 0, color: '', disabled: false }
};

export function usersReducer(state: UserState = initState, action: UsersActions): UserState {
    switch (action.type) {
        case UserActionTypes.GetUsers:
            return {
                ...state,
                fetching: true
            };
        case UserActionTypes.GetUsersSuccess:
            return {
                ...state,
                users: action.payload,
                fetching: false
            };
        case UserActionTypes.GetUsersFailed:
            return {
                ...state,
                fetching: false,
                users: []
            };
        case UserActionTypes.GetUsersFailed:
            return {
                ...state,
                fetching: false,
                users: []
            };
        case UserActionTypes.SetSelectedUserSuccess:
            return {
                ...state,
                selectedUser: action.payload
            };
        case UserActionTypes.InitSelectedUser: {
            return {
                ...state,
                selectedUser: { userName: '', email: '', id: 0, color: '', disabled: false }
            };
        }
        case UserActionTypes.CreateOrUpdateUser: {
            return {
                ...state,
                fetching: true
            };
        }
        case UserActionTypes.CreateOrUpdateUserFailed: {
            return {
                ...state,
                fetching: false
            };
        }
        case UserActionTypes.CreateOrUpdateUserSuccess: {
            const arr = [...state.users];
            const found = arr.find(u => u.id === action.payload.id);
            if (found) {
                // user found
                const index = arr.indexOf(found);
                arr[index] = action.payload;
            } else {
                // new user
                arr.push(action.payload);
            }
            return {
                ...state,
                users: arr,
                fetching: false
            };
        }
        default:
            return state;
    }
}
