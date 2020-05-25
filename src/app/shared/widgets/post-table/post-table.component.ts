import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Post } from '../../models/Post';
import { PagingInfo } from '../../models/postFilter';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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
  expandedElement: Post;
  displayedColumns: string[] = ['id', 'title', 'date', 'user', 'customer', 'progress'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

  pagingChange(event: PageEvent) {
    this.paginatorChanged.emit({ itemsPerPage: event.pageSize, currentPage: event.pageIndex });
  }
}
