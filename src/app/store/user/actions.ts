import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';


export enum UserActionTypes {
    GetUsers = '[User] Get Users',
    GetUsersSuccess = '[User] Get Users Success',
    GetUsersFailed = '[User] Get Users Failed',
}

export class LoadUsers implements Action {
    readonly type = UserActionTypes.GetUsers;
    constructor() { }
}

export class LoadUsersSuccess implements Action {
    readonly type = UserActionTypes.GetUsersSuccess;

    constructor(public payload: User[]) { }
}

export class LoadUsersFailed implements Action {
    readonly type = UserActionTypes.GetUsersFailed;
}


export type UsersActions = LoadUsers
    | LoadUsersSuccess
    | LoadUsersFailed;
