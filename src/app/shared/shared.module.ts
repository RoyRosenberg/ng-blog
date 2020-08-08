import {
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
} from '@angular-material-components/color-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { ActionItemItemComponent } from '../components/action-item-item/action-item-item.component';
import { ActionItemListComponent } from '../components/action-item-list/action-item-list.component';
import { AreaComponent } from '../components/area/area.component';
import { CardComponent } from '../components/card/card.component';
import { CustomerItemComponent } from '../components/customer-item/customer-item.component';
import { CustomerTableComponent } from '../components/customer-table/customer-table.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { PieComponent } from '../components/pie/pie.component';
import { PostItemComponent } from '../components/post-item/post-item.component';
import { PostSearchComponent } from '../components/post-search/post-search.component';
import { PostTableComponent } from '../components/post-table/post-table.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { TagItemComponent } from '../components/tag-item/tag-item.component';
import { TagSelectionComponent } from '../components/tag-selection/tag-selection.component';
import { TagTableComponent } from '../components/tag-table/tag-table.component';

export const BLOG_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    PostTableComponent,
    PostSearchComponent,
    PostItemComponent,
    TagSelectionComponent,
    TagTableComponent,
    CustomerTableComponent,
    TagItemComponent,
    CustomerItemComponent,
    ActionItemListComponent,
    ActionItemItemComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatStepperModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxMaterialTimepickerModule,
    MatSlideToggleModule,
    NgxMatColorPickerModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: BLOG_DATE_FORMATS },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    PostTableComponent,
    MatSpinner,
    PostSearchComponent,
    ReactiveFormsModule,
    PostItemComponent,
    TagTableComponent,
    CustomerTableComponent,
    TagItemComponent,
    CustomerItemComponent,
    ActionItemListComponent,
    ActionItemItemComponent
  ]
})
export class SharedModule { }
