import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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

    loadProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.LoadProjects),
            mergeMap(combined =>
                this.projectService.getProjects()
                    .pipe(
                        map(projects => ProjectActions.LoadProjectsSuccess({ projects })),
                        catchError((err) => {
                            console.log(err);
                            return of(ProjectActions.LoadProjectsFailed());
                        })
                    )
            )
        )
    );
}
