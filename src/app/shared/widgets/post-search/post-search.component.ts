import { Component, Input, OnInit } from '@angular/core';

import { User } from '../../models/user';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @Input() users: User[];
  constructor() { }

  ngOnInit() {
  }

}
