import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CustomerEditComponent } from 'src/app/pages/customer-edit/customer-edit.component';
import { CustomerListComponent } from 'src/app/pages/customer-list/customer-list.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { PostEditComponent } from 'src/app/pages/post-edit/post-edit.component';
import { PostListComponent } from 'src/app/pages/post-list/post-list.component';
import { TagEditComponent } from 'src/app/pages/tag-edit/tag-edit.component';
import { TagListComponent } from 'src/app/pages/tag-list/tag-list.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerModule } from 'src/app/store/customer/module';
import { PostModule } from 'src/app/store/posts/module';
import { ProjectModule } from 'src/app/store/project/module';
import { TagModule } from 'src/app/store/tag/module';
import { UserModule } from 'src/app/store/user/module';

import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserListComponent } from '../user-list/user-list.component';
import { DefaultComponent } from './default.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostListComponent,
    PostEditComponent,
    TagListComponent,
    CustomerListComponent,
    TagEditComponent,
    CustomerEditComponent,
    UserListComponent,
    UserEditComponent
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
    CustomerModule,
    ProjectModule,
    MatSnackBarModule,
    TagModule
  ],
  providers: [DashboardService]
})
export class DefaultModule { }
