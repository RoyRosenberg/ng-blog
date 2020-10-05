import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Tag } from 'src/app/models/tag';
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

    createOrUpdateTag$ = createEffect(() => this.actions$.pipe(
        ofType(TagActions.CreateOrUpdateTag),
        mergeMap(payload => {
            let result: Observable<Tag>;
            if (payload.tag.id === 0) {
                result = this.tagService.createTag(payload.tag);
            } else {
                result = this.tagService.updateTag(payload.tag);
            }
            return result.pipe(
                map(tag => TagActions.CreateOrUpdateTagSuccess({ tag: tag ? tag : payload.tag })),
                tap(res => {
                    this.router.navigate(['/tags/list']);
                    this.alertService.success(`Tag ${payload.tag.id === 0 ? 'Created' : 'Updated'} Created!✨🎉`);
                }, catchError(err => {
                    console.log(err);
                    this.alertService.error(`Tag ${payload.tag.id === 0 ? 'Creation' : 'Update'} Failed 😥`);
                    return of(TagActions.CreateOrUpdateTagFailed());
                })));
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
            } else { return of(TagActions.DeleteTagFailed()); }
        })
    ));
}
