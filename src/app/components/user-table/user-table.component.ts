import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input('userList')
  set userList(values: User[]) {
    this.users = values;
    this.dataSource.data = values;
    this.dataSource.paginator = this.paginator;
  }
  users: User[];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['userName', 'email', 'disabled'];
  searchUser = new FormControl();

  constructor() { }

  ngOnInit() {
    this.searchUser.valueChanges.subscribe(name => {
      if (!name) {
        this.dataSource.data = this.users;
      }
      else {
        this.dataSource.data = this.users.filter(t =>
          t.userName.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) === 0);
      }
    });
  }

  deleteUser(userId: number) {
    console.log('delete user', userId);
  }

}
