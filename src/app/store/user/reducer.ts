import { UserActionTypes, UsersActions } from './actions';
import { UserState } from './state';

export const initState: UserState = {
    fetching: false,
    users: []
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
        default:
            return state;
    }
}
