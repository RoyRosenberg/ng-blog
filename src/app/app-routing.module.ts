import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostEditComponent } from './modules/post-edit/post-edit.component';
import { PostListComponent } from './modules/post-list/post-list.component';


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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
