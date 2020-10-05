import { Color } from '@angular-material-components/color-picker';
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
    if (t === undefined) {
      return;
    }
    this.frmTag.patchValue({ name: t.name });
    this.frmTag.patchValue({ id: t.id });
    const res = this.hexToRgb(t.color);
    if (res !== null) {
      const col = new Color(res.r, res.g, res.b);
      this.frmTag.patchValue({ color: col });
    }
  }
  @Output() saveClick = new EventEmitter<Tag>();

  frmTag: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.frmTag = formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      id: [0, Validators.required]
    });
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  ngOnInit() {
  }

  onFormSubmit() {
    if (this.frmTag.valid) {
      const tag = this.frmTag.value as Tag;
      tag.color = `#${this.frmTag.value.color.hex}`;
      this.saveClick.emit(tag);
    }
  }

}
