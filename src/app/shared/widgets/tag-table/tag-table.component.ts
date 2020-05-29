import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Tag } from '../../models/tag';

@Component({
  selector: 'app-tag-table',
  templateUrl: './tag-table.component.html',
  styleUrls: ['./tag-table.component.scss']
})
export class TagTableComponent implements OnInit {
  @Input() loadingInProgress: boolean;
  tagList: Tag[];
  @Input('tags')
  set tags(values: Tag[]) {
    this.tagList = values;
    this.dataSource.data = values;
    this.dataSource.paginator = this.paginator;
  }
  dataSource = new MatTableDataSource<Tag>([]);
  displayedColumns: string[] = ['name', 'color'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchTag = new FormControl();
  constructor() { }

  ngOnInit() {
    this.searchTag.valueChanges.subscribe(name => {
      if (!name) {
        this.dataSource.data = this.tagList;
      }
      else {
        this.dataSource.data = this.tagList.filter(t =>
          t.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) === 0);
      }
    });
  }

}
