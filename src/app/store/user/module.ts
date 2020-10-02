import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects } from './effect';
import * as usersReducer from './reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('users', usersReducer.reducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: []
})
export class UserModule { }
