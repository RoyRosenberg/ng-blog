import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { TagService } from 'src/app/services/tag.service';

import { AppState } from '../appState';
import { TagActions } from '../tag';

@Injectable()
export class TagEffects {
    constructor(
        private actions$: Actions,
        private tagService: TagService,
        private router: Router,
        private store: Store<AppState>,
        private alertService: AlertService
    ) { }


    loadTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TagActions.LoadTags),
            mergeMap(combined =>
                this.tagService.getTags()
                    .pipe(
                        map(tags => TagActions.LoadTagsSuccess({ tags })),
                        catchError((err) => {
                            console.log(err);
                            return of(TagActions.LoadTagsFailed());
                        })
                    )
            )
        )
    );

    createTag$ = createEffect(() => this.actions$.pipe(
        ofType(TagActions.CreateTag),
        mergeMap(payload =>
            this.tagService.createTag(payload.tag).pipe(
                map(tag => TagActions.CreateTagSuccess({ tag })),
                tap(res => {
                    this.router.navigate(['/tags/list']);
                    this.alertService.success('Tag Created!✨🎉');
                }, catchError((err) => {
                    console.log(err);
                    this.alertService.error('Tag Creation Failed 😥');
                    return of(TagActions.CreateTagFailed());
                })
                ))
        )
    ));

    updateTag$ = createEffect(() => this.actions$.pipe(
        ofType(TagActions.UpdateTag),
        mergeMap(payload =>
            this.tagService.updateTag(payload.tag).pipe(
                map(res => TagActions.UpdateTagSuccess()),
                tap(res => {
                    this.router.navigate(['/tags/list']);
                    this.alertService.success('Tag Updated!✨🎉');
                }, catchError((err) => {
                    console.log(err);
                    this.alertService.error('Tag Update Failed 😥');
                    return of(TagActions.UpdateTagFailed());
                })
                ))
        )
    ));

    selectTag$ = createEffect(() => this.actions$.pipe(
        ofType(TagActions.SetSelectedTag),
        withLatestFrom(this.store),
        mergeMap(combined => {
            const [payload, state] = combined;
            const allTags = state.tags.tags;
            const filtered = allTags.filter(t => t.id === payload.tagId);
            if (filtered.length === 0) {
                this.router.navigate(['/tags/list']);
                this.alertService.error(`Tag with Id ${payload.tagId} not found!`);
                return of(TagActions.SetSelectedTagFailed());
            } else {
                const tag = { ...filtered[0] };
                return of(TagActions.SetSelectedTagSuccess({ tag }));
            }
        })
    ));

    deleteTag$ = createEffect(() => this.actions$.pipe(
        ofType(TagActions.DeleteTag),
        mergeMap(payload => {
            const approvedByUser = this.alertService.prompt('Are you sure?');
            if (approvedByUser) {
                return this.tagService.deleteTag(payload.tagId).pipe(
                    map(tagId => TagActions.DeleteTagSuccess({ tagId })),
                    tap(tagId =>
                        this.alertService.success('Tag Deleted 👍'),
                        catchError(err => {
                            console.log(err);
                            this.alertService.error('Tag Deletion Failed 😥');
                            return of(TagActions.DeleteTagFailed());
                        })
                    ));
            } else { return of(TagActions.DeleteTagCancelled()); }
        })
    ));
}
