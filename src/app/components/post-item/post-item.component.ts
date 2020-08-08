import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { Project } from 'src/app/models/project';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';

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
  actionItemList: FormArray;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postInfo = this.formBuilder.group({
      title: ['s', Validators.required],
      userId: [this.users[0].id, Validators.required],
      date: [new Date(), Validators.required],
      from: ['09:00', Validators.required],
      to: ['18:00', Validators.required],
      offline: [false],
      additionalHours: [0],
      customerId: [this.customers[0].id, Validators.required],
      projectId: [0, Validators.required],
      tagControl: []
    });

    this.postDetails = this.formBuilder.group({
      summary: ['s', Validators.required]
    });

    this.actionItemList = this.formBuilder.array([]);
    this.insertActionItem();
  }

  insertActionItem() {
    const newItem = this.formBuilder.group({
      userId: this.users[0].id,
      subject: ['', Validators.required],
      isCompleted: [true],
      user: [this.users[0]]
    });
    this.actionItemList.push(newItem);
  }

  removeAllActionItems() {
    this.actionItemList.clear();
  }

  customerSelectionChanged(event) {
    if (event.isUserInput) {
      this.projectOfCustomer = this.projects.filter(p => p.customerId === event.source.value);
      this.postInfo.patchValue({ projectId: this.projectOfCustomer[0].id });
    }
  }

}
