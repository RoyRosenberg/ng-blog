import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProjectEffects } from './effect';
import { projectsReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('projects', projectsReducer),
    EffectsModule.forFeature([ProjectEffects])
  ],
  declarations: []
})
export class ProjectModule { }
