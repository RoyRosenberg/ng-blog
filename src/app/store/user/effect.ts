import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

import { UserActions } from '../user';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    @Effect()
    loadUsers$ = this.actions$.pipe(
        // tap(() => console.log('In user Effect')),
        ofType(UserActions.UserActionTypes.GetUsers),
        mergeMap(combined =>
            this.userService.getUsers()
                .pipe(
                    tap(u => console.log('user list ', u)),
                    map(res => new UserActions.LoadUsersSuccess(res)),
                    catchError((err) => {
                        console.log(err);
                        return of(new UserActions.LoadUsersFailed());
                    })
                )
        )
    );
}
