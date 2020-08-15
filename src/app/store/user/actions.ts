import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';


export enum UserActionTypes {
    GetUsers = '[User] Get Users',
    GetUsersSuccess = '[User] Get Users Success',
    GetUsersFailed = '[User] Get Users Failed',

    InitSelectedUser = '[User] Init Selected',
    SetSelectedUser = '[User] Set Selected',
    SetSelectedUserSuccess = '[User] Set Selected Success',
    SetSelectedUserFailed = '[User] Set Selected Failed',

    CreateOrUpdateUser = '[User] Create or Update',
    CreateOrUpdateUserSuccess = '[User] Create or Update Success',
    CreateOrUpdateUserFailed = '[User] Create or Update Failed',
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

export class InitSelectedUser implements Action {
    readonly type = UserActionTypes.InitSelectedUser;
}

export class SetSelectedUser implements Action {
    readonly type = UserActionTypes.SetSelectedUser;
    constructor(public payload: number) { }
}

export class SetSelectedUserSuccess implements Action {
    readonly type = UserActionTypes.SetSelectedUserSuccess;
    constructor(public payload: User) { }
}

export class SetSelectedUserFailed implements Action {
    readonly type = UserActionTypes.SetSelectedUserFailed;
}

export class CreateOrUpdateUser implements Action {
    readonly type = UserActionTypes.CreateOrUpdateUser;
    constructor(public payload: User) { }
}

export class CreateOrUpdateUserSuccess implements Action {
    readonly type = UserActionTypes.CreateOrUpdateUserSuccess;
    constructor(public payload: User) { }
}

export class CreateOrUpdateUserFailed implements Action {
    readonly type = UserActionTypes.CreateOrUpdateUserFailed;
}

export type UsersActions = LoadUsers
    | LoadUsersSuccess
    | LoadUsersFailed
    | SetSelectedUser
    | SetSelectedUserSuccess
    | SetSelectedUserFailed
    | InitSelectedUser
    | CreateOrUpdateUser
    | CreateOrUpdateUserSuccess
    | CreateOrUpdateUserFailed;
