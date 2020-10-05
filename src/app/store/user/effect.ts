import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.LoadUsers),
        mergeMap(combined =>
            this.userService.getUsers()
                .pipe(
                    map(users => UserActions.LoadUsersSuccess({ users })),
                    catchError((err) => {
                        console.log(err);
                        return of(UserActions.LoadUsersFailed());
                    })
                )
        ))
    );

    selectUser = createEffect(() => this.actions$.pipe(
        ofType(UserActions.SetSelectedUser),
        withLatestFrom(this.store),
        mergeMap(combined => {
            const [payload, state] = combined;
            const allUsers = state.users.users;
            const filtered = allUsers.filter(t => t.id === payload.userId);
            if (filtered.length === 0) {
                console.log('getting user from backend', payload.userId);
                return this.userService.getUser(payload.userId).pipe(
                    // tap(u => console.log('user returned', u)),
                    map(user => UserActions.SetSelectedUserSuccess({ user })),
                    catchError((err) => {
                        console.log(err);
                        this.router.navigate(['/users/list']);
                        this.alertService.error(`User with Id ${payload.userId} not found!`);
                        return of(UserActions.SetSelectedUserFailed());
                    })
                );
            } else {
                const user = { ...filtered[0] };
                return of(UserActions.SetSelectedUserSuccess({ user }));
            }
        }))
    );

    createOrUpdateUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.CreateOrUpdateUser),
        withLatestFrom(this.store),
        mergeMap(combined => {
            const [payload, state] = combined;
            const usr = payload.user;
            if (state.users.selectedUser.id === 0) {
                return this.userService.createUser(usr).pipe(
                    tap(res => {
                        this.router.navigate(['/users/list']);
                        this.alertService.success('User Created!✨🎉');
                    }),
                    map(user => UserActions.CreateOrUpdateUserSuccess({ user })),
                    catchError((err) => {
                        console.log(err);
                        return of(UserActions.CreateOrUpdateUserFailed());
                    })
                );
            } else {
                return this.userService.updateUser(usr).pipe(
                    tap(res => {
                        this.router.navigate(['/users/list']);
                        this.alertService.success('User Updated!✨🎉');
                    }),
                    map(user => UserActions.CreateOrUpdateUserSuccess({ user })),
                    catchError((err) => {
                        console.log(err);
                        return of(UserActions.CreateOrUpdateUserFailed());
                    })
                );
            }
        }))
    );
}
