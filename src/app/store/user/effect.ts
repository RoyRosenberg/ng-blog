import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

import { AppState } from '../appState';
import { UserActions } from '../user';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private userService: UserService,
        private router: Router,
        private alertService: AlertService
    ) { }

    @Effect()
    loadUsers$ = this.actions$.pipe(
        // tap(() => console.log('In user Effect')),
        ofType(UserActions.UserActionTypes.GetUsers),
        mergeMap(combined =>
            this.userService.getUsers()
                .pipe(
                    // tap(u => console.log('user list ', u)),
                    map(res => new UserActions.LoadUsersSuccess(res)),
                    catchError((err) => {
                        console.log(err);
                        return of(new UserActions.LoadUsersFailed());
                    })
                )
        )
    );

    @Effect()
    selectUser = this.actions$.pipe(
        ofType<UserActions.SetSelectedUser>(UserActions.UserActionTypes.SetSelectedUser),
        withLatestFrom(this.store),
        mergeMap(combined => {
            const [act, state] = combined;
            const allUsers = state.users.users;
            const filtered = allUsers.filter(t => t.id === act.payload);
            if (filtered.length === 0) {
                console.log('getting user from backend', act.payload);
                return this.userService.getUser(act.payload).pipe(
                    // tap(u => console.log('user returned', u)),
                    map(u => new UserActions.SetSelectedUserSuccess(u)),
                    catchError((err) => {
                        console.log(err);
                        this.router.navigate(['/users/list']);
                        this.alertService.error(`User with Id ${act.payload} not found!`);
                        return of(new UserActions.SetSelectedUserFailed());
                    })
                );
            } else {
                const cloned = { ...filtered[0] };
                return of(new UserActions.SetSelectedUserSuccess(cloned));
            }
        })
    );

    @Effect()
    createOrUpdateUser$ = this.actions$.pipe(
        ofType<UserActions.CreateOrUpdateUser>(UserActions.UserActionTypes.CreateOrUpdateUser),
        withLatestFrom(this.store),
        mergeMap(combined => {
            const [act, state] = combined;
            const user = act.payload;
            if (state.users.selectedUser.id === 0) {
                return this.userService.createUser(user).pipe(
                    tap(res => {
                        this.router.navigate(['/users/list']);
                        this.alertService.success('User Created!✨🎉');
                    }),
                    map(res => new UserActions.CreateOrUpdateUserSuccess(res)),
                    catchError((err) => {
                        console.log(err);
                        return of(new UserActions.CreateOrUpdateUserFailed());
                    })
                );
            } else {
                return this.userService.updateUser(user).pipe(
                    tap(res => {
                        this.router.navigate(['/users/list']);
                        this.alertService.success('User Updated!✨🎉');
                    }),
                    map(res => new UserActions.CreateOrUpdateUserSuccess(res)),
                    catchError((err) => {
                        console.log(err);
                        return of(new UserActions.CreateOrUpdateUserFailed());
                    })
                );
            }
        })
    );
}
