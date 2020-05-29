import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  @Input() loadingInProgress: boolean;
  customerList: Customer[];
  @Input('customers')
  set customers(values: Customer[]) {
    this.customerList = values;
    this.dataSource.data = values;
    console.log('setting paginator');
    this.dataSource.paginator = this.paginator;
  }
  dataSource = new MatTableDataSource<Customer>([]);
  displayedColumns: string[] = ['company', 'contact', 'phone', 'address', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchCustomer = new FormControl();
  constructor() { }

  ngOnInit() {
    this.searchCustomer.valueChanges.subscribe(name => {
      if (!name) {
        this.dataSource.data = this.customerList;
      }
      else {
        this.dataSource.data = this.customerList.filter(t =>
          t.company.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) === 0);
      }
    });
  }

}
