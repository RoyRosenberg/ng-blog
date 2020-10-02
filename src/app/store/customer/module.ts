import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CustomerEffects } from './effect';
import * as customerReducer from './reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('customers', customerReducer.reducer),
    EffectsModule.forFeature([CustomerEffects])
  ],
  declarations: []
})
export class CustomerModule { }
