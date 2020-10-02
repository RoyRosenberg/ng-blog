import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProjectEffects } from './effect';
import * as projectsReducer from './reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('projects', projectsReducer.reducer),
    EffectsModule.forFeature([ProjectEffects])
  ],
  declarations: []
})
export class ProjectModule { }
