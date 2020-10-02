import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const LoadUsers = createAction('[User] Get Users');
export const LoadUsersSuccess = createAction('[User] Get Users Success', props<{ users: User[] }>());
export const LoadUsersFailed = createAction('[User] Get Users Failed');
export const InitSelectedUser = createAction('[User] Init Selected');
export const SetSelectedUser = createAction('[User] Set Selected', props<{ userId: number }>());
export const SetSelectedUserSuccess = createAction('[User] Set Selected Success', props<{ user: User }>());
export const SetSelectedUserFailed = createAction('[User] Set Selected Failed');
export const CreateOrUpdateUser = createAction('[User] Create or Update', props<{ user: User }>());
export const CreateOrUpdateUserSuccess = createAction('[User] Create or Update Success', props<{ user: User }>());
export const CreateOrUpdateUserFailed = createAction('[User] Create or Update Failed');

