import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultComponent } from './pages/default/default.component';
import { PostEditComponent } from './pages/post-edit/post-edit.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { TagEditComponent } from './pages/tag-edit/tag-edit.component';
import { TagListComponent } from './pages/tag-list/tag-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserListComponent } from './pages/user-list/user-list.component';


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
      {
        path: 'users',
        children: [
          { path: 'list', component: UserListComponent },
          { path: 'add', component: UserEditComponent },
          { path: 'edit/:id', component: UserEditComponent },
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
