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
      { path: '', component: DashboardComponent, data: { title: 'Home' } },
      {
        path: 'posts',
        children: [
          { path: 'list', component: PostListComponent, data: { title: 'Post List' } },
          { path: 'edit', component: PostEditComponent, data: { title: 'Edit Post' } }
        ]
      },
      {
        path: 'tags',
        children: [
          { path: 'list', component: TagListComponent, data: { title: 'Tag List' } },
          { path: 'add', component: TagEditComponent, data: { title: 'Add Tag' } },
          { path: 'edit/:id', component: TagEditComponent, data: { title: 'Edit Tag' } },
        ]
      },
      {
        path: 'customers',
        children: [
          { path: 'list', component: CustomerListComponent, data: { title: 'Customer List' } },
          { path: 'edit/:id', component: CustomerEditComponent, data: { title: 'Edit Customer' } },
        ]
      },
      {
        path: 'users',
        children: [
          { path: 'list', component: UserListComponent, data: { title: 'User List' } },
          { path: 'add', component: UserEditComponent, data: { title: 'Add User' } },
          { path: 'edit/:id', component: UserEditComponent, data: { title: 'Edit User' } },
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
