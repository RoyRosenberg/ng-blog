import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TagService } from 'src/app/services/tag.service';

import { TagActions } from '../tag';

@Injectable()
export class TagEffects {
    constructor(
        private actions$: Actions,
        private tagService: TagService,
        private router: Router
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
                tap(res => this.router.navigate(['/tags/list']),
                catchError((err) => {
                    console.log(err);
                    return of(new TagActions.CreateTagFailed());
                })
            ))
    ));
}
