import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-action-item-item',
  templateUrl: './action-item-item.component.html',
  styleUrls: ['./action-item-item.component.css']
})
export class ActionItemItemComponent implements OnInit {
  @Input() set item(i: FormGroup) {
    this.actionItemGrp = i;
  }
  @Input() userList: User[];
  actionItemGrp: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.actionItemGrp = formBuilder.group({
      subject: ['', Validators.required],
      userId: [0, Validators.required],
      isCompleted: [true]
    });
  }

  ngOnInit() {
  }

}
