import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tag } from '../../models/tag';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.css']
})
export class TagItemComponent implements OnInit {
  @Input('tag') set tag(t: Tag) {
    this.frmTag.patchValue({ name: t.name });
    this.frmTag.patchValue({ color: t.color });
  }
  @Output() saveClick = new EventEmitter<Tag>();

  frmTag: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.frmTag = formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onFormSubmit() {
    if (this.frmTag.valid) {
      const tag = this.frmTag.value as Tag;
      tag.color = `#${this.frmTag.value.color.hex}`;
      console.log('tag:', tag);
      this.saveClick.emit(tag);
    }
  }

}
