import { Component, Input, OnInit } from '@angular/core';

import { Customer } from '../../models/customer';
import { User } from '../../models/user';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @Input() users: User[];
  @Input() customers: Customer[];
  constructor() { }

  ngOnInit() {
  }

}
