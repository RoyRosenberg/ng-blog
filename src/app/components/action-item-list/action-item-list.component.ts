import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionItem } from 'src/app/models/action-item';

@Component({
  selector: 'app-action-item-list',
  templateUrl: './action-item-list.component.html',
  styleUrls: ['./action-item-list.component.css']
})
export class ActionItemListComponent implements OnInit {
  @Input() items: ActionItem[] = [];
  @Output() actionItemChanged = new EventEmitter<ActionItem>();
  constructor() { }

  ngOnInit() {
  }

  toggle(i: ActionItem) {
    i.isCompleted = !i.isCompleted;
    this.actionItemChanged.emit(i);
  }

}
