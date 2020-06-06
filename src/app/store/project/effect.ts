import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProjectService } from 'src/app/services/project.service';

import { ProjectActions } from '../project';

@Injectable()
export class ProjectEffects {
    constructor(
        private actions$: Actions,
        private projectService: ProjectService
    ) { }

    @Effect()
    loadProjects$ = this.actions$.pipe(
        // tap(() => console.log('In Project Effect')),
        ofType(ProjectActions.ProjectActionTypes.GetProjects),
        mergeMap(combined =>
            this.projectService.getProjects()
                .pipe(
                    map(res => new ProjectActions.LoadProjectsSuccess(res)),
                    catchError((err) => {
                        console.log(err);
                        return of(new ProjectActions.LoadProjectsFailed());
                    })
                )
        )
    );
}
