import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PagingInfo } from 'src/app/models/postFilter';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostTableComponent implements OnInit, OnDestroy {
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
  displayedColumns: string[] = ['id', 'title', 'date', 'user', 'customer', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  mediaSub: Subscription;
  constructor(private mediaObserver: MediaObserver) { }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$
      .subscribe((change: MediaChange) => {
        // console.log(change.mqAlias);
      });
  }

  pagingChange(event: PageEvent) {
    this.paginatorChanged.emit({ itemsPerPage: event.pageSize, currentPage: event.pageIndex });
  }
}
