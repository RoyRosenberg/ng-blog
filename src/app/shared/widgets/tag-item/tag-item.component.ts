import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.css']
})
export class TagItemComponent implements OnInit {

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
    console.log(this.frmTag.value);
  }

}
