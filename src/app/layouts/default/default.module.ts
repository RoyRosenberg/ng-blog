import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { PostListComponent } from 'src/app/modules/post-list/post-list.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerModule } from 'src/app/store/customer/module';
import { PostModule } from 'src/app/store/posts/module';
import { UserModule } from 'src/app/store/user/module';

import { DefaultComponent } from './default.component';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    PostModule,
    UserModule,
    CustomerModule
  ],
  providers: [DashboardService]
})
export class DefaultModule { }
