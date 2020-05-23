import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Customer } from '../../models/customer';
import { PostSearchFilter } from '../../models/postFilter';
import { User } from '../../models/user';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @Input() users: User[];
  @Input() customers: Customer[];
  @Output() search = new EventEmitter<PostSearchFilter>();
  searchForm: FormGroup;
  constructor() {
    this.searchForm = new FormGroup({
      userId: new FormControl(0),
      customerId: new FormControl(0),
      fromDate: new FormControl(new Date()),
      toDate: new FormControl(new Date()),
    });
   }

  ngOnInit() {
  }

  searchClicked() {
    console.log(this.searchForm.value);
    const filter: PostSearchFilter = {
      userId: this.searchForm.value.userId,
      customerId: this.searchForm.value.customerId,
      fromDate: this.searchForm.value.fromDate,
      toDate: this.searchForm.value.toDate,
      tags: []
    };
    console.log(filter);
    this.search.emit(filter);
  }
}
