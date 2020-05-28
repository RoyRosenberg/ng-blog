import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from '../../models/customer';
import { User } from '../../models/user';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class PostItemComponent implements OnInit {
  @Input() users: User[];
  @Input() customers: Customer[];
  postInfo: FormGroup;
  postDetails: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postInfo = this.formBuilder.group({
      title: ['', Validators.required],
      userId: [0, Validators.required],
      date: [new Date(), Validators.required],
      customerId: [0, Validators.required]
    });
    this.postDetails = this.formBuilder.group({
      summary: ['', Validators.required]
    });
  }

}
