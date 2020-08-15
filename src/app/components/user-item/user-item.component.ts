import { Color } from '@angular-material-components/color-picker';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  frmUser: FormGroup;
  @Input() set user(u: User){
    if (u === undefined) {
      return;
    }
    this.frmUser.patchValue({ userName: u.userName });
    this.frmUser.patchValue({ id: u.id });
    this.frmUser.patchValue({ email: u.email });
    this.frmUser.patchValue({ disabled: u.disabled });
    const res = this.hexToRgb(u.color);
    if (res !== null) {
      const col = new Color(res.r, res.g, res.b);
      this.frmUser.patchValue({ color: col });
    }
  }
  @Output() saveClick = new EventEmitter<User>();
  constructor(private formBuilder: FormBuilder) {
    this.frmUser = formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      color: ['', Validators.required],
      id: [0, Validators.required],
      disabled: [false],
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
    if (this.frmUser.valid) {
      const user = this.frmUser.value as User;
      user.color = `#${this.frmUser.value.color.hex}`;
      this.saveClick.emit(user);
    }
  }
}
