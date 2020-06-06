import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './layouts/default/default.component';
import { CustomerEditComponent } from './modules/customer-edit/customer-edit.component';
import { CustomerListComponent } from './modules/customer-list/customer-list.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostEditComponent } from './modules/post-edit/post-edit.component';
import { PostListComponent } from './modules/post-list/post-list.component';
import { TagEditComponent } from './modules/tag-edit/tag-edit.component';
import { TagListComponent } from './modules/tag-list/tag-list.component';


const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'posts',
        children: [
          { path: 'list', component: PostListComponent },
          { path: 'edit', component: PostEditComponent }
        ]
      },
      {
        path: 'tags',
        children: [
          { path: 'list', component: TagListComponent },
          { path: 'add', component: TagEditComponent },
          { path: 'edit/:id', component: TagEditComponent },
        ]
      },
      {
        path: 'customers',
        children: [
          { path: 'list', component: CustomerListComponent },
          { path: 'edit/:id', component: CustomerEditComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
