import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostEffects } from './effect';
import * as fromPosts from './reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('posts', fromPosts.reducer),
    EffectsModule.forFeature([PostEffects])
  ],
  declarations: []
})
export class PostModule { }
