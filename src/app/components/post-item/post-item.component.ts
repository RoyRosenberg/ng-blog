import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { Post } from 'src/app/models/Post';
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
  @Output() SavePost = new EventEmitter<Post>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postInfo = this.formBuilder.group({
      id: [0],
      title: ['s', Validators.required],
      userId: [this.users[0].id, Validators.required],
      date: [new Date(), Validators.required],
      from: ['09:00', Validators.required],
      to: ['18:00', Validators.required],
      offline: [false],
      additionalHours: [0],
      customerId: [this.customers[0].id, Validators.required],
      projectId: [0, Validators.required],
      tags: this.formBuilder.array([])
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

  selectedCustomer() {
    const custId = +this.postInfo.value.customerId;
    const res = this.customers.find(c => c.id === custId);
    return res;
  }

  selectedUser() {
    const custId = +this.postInfo.value.userId;
    const res = this.users.find(c => c.id === custId);
    return res;
  }

  saveClicked() {
    const post: Post = { ...this.postInfo.value };
    post.actionItems = this.actionItemList.value;
    const d: Date = post.date;
    const date: any = `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}T00:00:00`;
    // const date: any = `${d.getDate()}\\${d.getMonth() + 1}\\${d.getFullYear()}`;
    // const date: any = `${d.getMonth() + 1}\\${d.getDate()}\\${d.getFullYear()}`;
    post.date = date;
    post.summary = this.postDetails.controls.summary.value;
    console.log('post save', post);
    this.SavePost.emit(post);
  }

}
