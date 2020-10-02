import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { PostService } from 'src/app/services/post.service';

import { AppState } from '../appState';
import { PostActions } from '../posts';

@Injectable()
export class PostEffects {
    constructor(
        private actions$: Actions,
        private postService: PostService,
        private store: Store<AppState>,
        private router: Router,
        private alertService: AlertService
    ) { }

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostActions.LoadPosts),
            withLatestFrom(this.store),
            mergeMap(combined =>
                this.postService.getPosts(combined[1].posts.filter)
                    .pipe(
                        tap(res => console.log('res from server:', res)),
                        map(res => PostActions.LoadPostsSuccess({ pagingResponse: res })),
                        catchError(err => {
                            console.log(err);
                            return of(PostActions.LoadPostsFailed());
                        })
                    )))
    );

    // @Effect()
    // loadPosts$ = this.actions$.pipe(
    //     // tap(() => console.log('In posts Effect')),
    //     ofType(PostActions.PostActionTypes.GetPosts),
    //     withLatestFrom(this.store),
    //     mergeMap(combined =>
    //         this.postService.getPosts(combined[1].posts.filter)
    //             .pipe(
    //                 tap(res => console.log('res from server:', res)),
    //                 map(res => new PostActions.LoadPostsSuccess(res)),
    //                 catchError((err) => {
    //                     console.log(err);
    //                     return of(new PostActions.LoadPostsFailed());
    //                 })
    //             )
    //     )
    // );

    createOrUpdatePost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostActions.CreateOrUpdatePost),
            mergeMap(action => {
                if (action.post.id === 0) {
                    return this.postService.createPost(action.post)
                        .pipe(
                            tap(res => {
                                this.router.navigate(['/posts/list']);
                                this.alertService.success('Post Created!✨🎉');
                            }),
                            map(res => PostActions.CreateOrUpdatePostSuccess({ post: res })),
                            catchError((err) => {
                                console.log(err);
                                return of(PostActions.LoadPostsFailed());
                            })
                        );
                } else {
                    return this.postService.updatePost(action.post)
                        .pipe(
                            tap(res => {
                                this.router.navigate(['/posts/list']);
                                this.alertService.success('Post Updated!✨🎉');
                            }),
                            map(res => PostActions.CreateOrUpdatePostSuccess({ post: res })),
                            catchError((err) => {
                                console.log(err);
                                return of(PostActions.LoadPostsFailed());
                            })
                        );
                }
            })
        )
    );

    // @Effect()
    // createOrUpdatePost$ = this.actions$.pipe(
    //     ofType<PostActions.CreateOrUpdatePost>(PostActions.PostActionTypes.CreateOrUpdatePost),
    //     mergeMap(action => {
    //         if (action.payload.id === 0) {
    //             return this.postService.createPost(action.payload)
    //                 .pipe(
    //                     tap(res => {
    //                         this.router.navigate(['/posts/list']);
    //                         this.alertService.success('Post Created!✨🎉');
    //                     }),
    //                     map(res => new PostActions.CreateOrUpdatePostSuccess(res)),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new PostActions.LoadPostsFailed());
    //                     })
    //                 );
    //         } else {
    //             return this.postService.updatePost(action.payload)
    //                 .pipe(
    //                     tap(res => {
    //                         this.router.navigate(['/posts/list']);
    //                         this.alertService.success('Post Updated!✨🎉');
    //                     }),
    //                     map(res => new PostActions.CreateOrUpdatePostSuccess(res)),
    //                     catchError((err) => {
    //                         console.log(err);
    //                         return of(new PostActions.LoadPostsFailed());
    //                     })
    //                 );
    //         }
    //     })
    // );
}
