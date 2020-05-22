import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { postsReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('posts', postsReducer)
  ],
  declarations: []
})
export class PostModule { }
