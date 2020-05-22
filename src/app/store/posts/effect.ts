import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

import { AppState } from '../appState';
import { PostActions } from '../posts';

@Injectable()
export class PostEffects {
    constructor(
        private actions$: Actions,
        private postService: PostService,
        private store: Store<AppState>
    ) { }

    @Effect()
    loadPosts$ = this.actions$.pipe(
        tap(() => console.log('In posts Effect')),
        ofType(PostActions.PostActionTypes.GetPosts),
        withLatestFrom(this.store),
        mergeMap(combined =>
            this.postService.getPosts(combined[1].posts.filter)
                .pipe(
                    tap(res => console.log('res from server:', res)),
                    map(res => new PostActions.LoadPostsSuccess(res)),
                    catchError((err) => {
                        console.log(err);
                        return of(new PostActions.LoadPostsFailed());
                    })
                )
        )
    );
}
