import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

import { PostActions } from '../posts';

@Injectable()
export class PostEffects {
    constructor(
        private actions$: Actions,
        private postService: PostService,
        // private store: Store<AppState>
    ) { }

    @Effect()
    loadPosts$ = this.actions$.pipe(
        tap(() => console.log('In posts Effect')),
        ofType(PostActions.PostActionTypes.GetPosts),
        mergeMap(action =>
            this.postService.getPosts()
                .pipe(
                    map(res => new PostActions.LoadPostsSuccess(res)),
                    catchError((err) => {
                        console.log(err);
                        return of(new PostActions.LoadPostsFailed());
                    })
                )
        )
    );
}
