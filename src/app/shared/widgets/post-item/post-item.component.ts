import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from '../../models/customer';
import { Project } from '../../models/project';
import { Tag } from '../../models/tag';
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
  @Input() tags: Tag[];
  @Input() projects: Project[];
  postInfo: FormGroup;
  postDetails: FormGroup;
  projectOfCustomer: Project[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postInfo = this.formBuilder.group({
      title: ['', Validators.required],
      userId: [this.users[0].id, Validators.required],
      date: [new Date(), Validators.required],
      customerId: [this.customers[0].id, Validators.required],
      projectId: [0, Validators.required],
      tagControl: []
    });

    this.postDetails = this.formBuilder.group({
      summary: ['', Validators.required]
    });
  }

  customerSelectionChanged(event) {
    console.log('cust changed', event);
    if (event.isUserInput) {
      this.projectOfCustomer = this.projects.filter(p => p.customerId === event.source.value);
      this.postInfo.patchValue({ projectId: this.projectOfCustomer[0].id });
    }
  }

}
