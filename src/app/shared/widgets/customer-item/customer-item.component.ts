import { Color } from '@angular-material-components/color-picker';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { Customer } from '../../models/customer';
import { Project } from '../../models/project';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit {
  @Input() set projects(list: Project[]) {
    this.dataSource.data = list;
  }
  @Input() set customer(c: Customer) {
    // console.log('customer', c);
    if (c !== null) {
      this.frmCustomer.patchValue({ company: c.company });
      this.frmCustomer.patchValue({ contact: c.contact });
      this.frmCustomer.patchValue({ address: c.address });
      this.frmCustomer.patchValue({ id: c.id });
      if (c.color) {
        const res = this.hexToRgb(c.color);
        const col = new Color(res.r, res.g, res.b);
        this.frmCustomer.patchValue({ color: col });
      }
    }
  }
  dataSource = new MatTableDataSource<Project>([]);
  displayedColumns: string[] = ['name', 'date', 'state', 'actions'];
  frmCustomer: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.frmCustomer = formBuilder.group({
      company: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      color: ['', Validators.required],
      id: [0, Validators.required]
    });
  }

  ngOnInit() {
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  onFormSubmit() {

  }

}
