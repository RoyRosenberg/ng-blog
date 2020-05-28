import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TagEffects } from './effect';
import { tagsReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('tags', tagsReducer),
    EffectsModule.forFeature([TagEffects])
  ],
  declarations: []
})
export class TagModule { }
