import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Tag } from '../../models/tag';

@Component({
  selector: 'app-tag-selection',
  templateUrl: './tag-selection.component.html',
  styleUrls: ['./tag-selection.component.css']
})
export class TagSelectionComponent {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;
  tagList: Tag[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Input() tags: Tag[];

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      // tap(x => console.log(x)),
      startWith(null),
      map((tagName: string | null) => tagName ? this._filter(tagName) : this.tags));
  }

  add(event: MatChipInputEvent): void {
    // console.log('event add', event);

    const input = event.input;
    const value = event.value;
    const searchedTag = this.stringToTag(value);

    // Add our tag
    if (searchedTag !== null) {
      this.tagList.push(searchedTag);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: Tag): void {
    const index = this.tagList.indexOf(tag);

    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // console.log('selected', event.option.value);
    const tagName = event.option.value;
    const tag = this.stringToTag(tagName);
    if (tag !== null) {
      this.tagList.push(tag);
    }
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): Tag[] {
    // console.log('val:', value);
    const filterValue = value?.toLowerCase();

    return this.tags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private stringToTag(tagName: string): Tag {
    const res = this.tags.filter(t => t.name === tagName);
    if (res.length === 1) {
      return res[0];
    }
    else {
      return null;
    }
  }

}
