import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { TagService } from 'src/app/services/tag.service';

import { TagActions } from '../tag';
import { AppState } from '../appState';
import { Store } from '@ngrx/store';

@Injectable()
export class TagEffects {
    constructor(
        private actions$: Actions,
        private tagService: TagService,
        private router: Router,
        private store: Store<AppState>,
        private alertService: AlertService
    ) { }

    @Effect()
    loadTags$ = this.actions$.pipe(
        tap(() => console.log('In Tag Effect')),
        ofType(TagActions.TagActionTypes.GetTags),
        mergeMap(combined =>
            this.tagService.getTags()
                .pipe(
                    map(res => new TagActions.LoadTagsSuccess(res)),
                    catchError((err) => {
                        console.log(err);
                        return of(new TagActions.LoadTagsFailed());
                    })
                )
        )
    );

    @Effect()
    createTag = this.actions$.pipe(
        ofType<TagActions.CreateTag>(TagActions.TagActionTypes.CreateTag),
        mergeMap(action =>
            this.tagService.createTag(action.payload).pipe(
                map(res => new TagActions.CreateTagSuccess(res)),
                tap(res => {
                    this.router.navigate(['/tags/list']);
                    this.alertService.success('Tag Created!✨🎉');
                }, catchError((err) => {
                    console.log(err);
                    this.alertService.error('Tag Creation Failed 😥');
                    return of(new TagActions.CreateTagFailed());
                })
                ))
        )
    );

    @Effect()
    updateTag = this.actions$.pipe(
        ofType<TagActions.UpdateTag>(TagActions.TagActionTypes.UpdateTag),
        mergeMap(action =>
            this.tagService.updateTag(action.payload).pipe(
                map(res => new TagActions.UpdateTagSuccess()),
                tap(res => {
                    this.router.navigate(['/tags/list']);
                    this.alertService.success('Tag Updated!✨🎉');
                }, catchError((err) => {
                    console.log(err);
                    this.alertService.error('Tag Update Failed 😥');
                    return of(new TagActions.UpdateTagFailed());
                })
                ))
        )
    );

    @Effect()
    selectTag = this.actions$.pipe(
        ofType<TagActions.SetSelectedTag>(TagActions.TagActionTypes.SetSelectedTag),
        withLatestFrom(this.store),
        mergeMap(combined => {
            const [act, state] = combined;
            const allTags = state.tags.tags;
            const filtered = allTags.filter(t => t.id === act.payload);
            if (filtered.length === 0) {
                this.router.navigate(['/tags/list']);
                this.alertService.error(`Tag with Id ${act.payload} not found!`);
                return of(new TagActions.SetSelectedTagFailed());
            } else {
                const cloned = { ...filtered[0] };
                return of(new TagActions.SetSelectedTagSuccess(cloned));
            }
        })
    );
}
