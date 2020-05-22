import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Post } from '../../models/Post';
import { PagingInfo } from '../../models/postFilter';

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
  @Input('pageSize')
  set pageSize(postPerPageCount: number) {
    console.log('postPerPageCount', postPerPageCount);
    this.paginator.pageSize = postPerPageCount;
  }
  @Input('length')
  set length(length: number) {
    console.log('length', length);
    this.paginator.length = length;
  }
  @Input() loadingInProgress: boolean;
  @Output() paginatorChanged = new EventEmitter<PagingInfo>();
  dataSource = new MatTableDataSource<Post>([]);
  displayedColumns: string[] = ['id', 'title', 'date', 'userId'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

  pagingChange(event: PageEvent) {
    this.paginatorChanged.emit({ itemsPerPage: event.pageSize, currentPage: event.pageIndex });
  }
}
