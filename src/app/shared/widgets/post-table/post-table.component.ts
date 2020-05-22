import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Post } from '../../models/Post';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit {
  @Input('posts')
  set posts(values: Post[]) {
    this.dataSource.data = values;
  }
  dataSource = new MatTableDataSource<Post>([]);
  displayedColumns: string[] = ['id', 'title', 'date', 'userId'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

}
