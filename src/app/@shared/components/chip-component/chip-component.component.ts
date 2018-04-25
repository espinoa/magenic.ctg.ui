import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { SharedModule } from './../../shared.module';
import { ChipContent } from '@shared/entities/chipcontent';
import { Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-chip-component',
  templateUrl: './chip-component.component.html',
  styleUrls: ['./chip-component.component.less']
})
export class ChipListComponent implements OnInit {
  public separatorKeysCodes = [ENTER, COMMA];
  private currentText = '';

  // Chip Options Content
  @Input() chipContent: ChipContent;

  // Selector attributes
  @Input() visible = true;
  @Input() selectable = true;
  @Input() removable = true;
  @Input() addOnBlur = false;

  constructor() {
  }

  ngOnInit() {
    if (null == this.chipContent) {
      throw new Error('Chip Content was not supplied, please supply the chipContent on app-chip-component tag');
    }
  }

  get hasOptions(): boolean {
    return this.availableOptions.length > 0;
  }

  get filteredOptions(): string[] {
    return this.availableOptions.filter(option =>
      option.toLowerCase().indexOf(this.currentText.toLowerCase()) === 0);
  }

  private get availableOptions(): string[] {
    return this.chipContent.chipOptions.filter(x => this.checkExisting(x));
  }

  private filter($event) {
    this.currentText = (<HTMLInputElement>event.target).value;
  }

  private addToSelectedTags(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (this.chipContent.chipOptions.indexOf(value) < 0) {
      return;
    }

    if (!this.checkExisting(value)) {
      this.reFocusInputBox();
      return;
    }

    if ((value || '').trim()) {
      this.chipContent.selectedChips.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.resetFilter();
  }

  private removeFromSelectedTags(tag: string): void {
    const index = this.chipContent.selectedChips.indexOf(tag);

    if (index >= 0) {
      this.chipContent.selectedChips.splice(index, 1);
    }
    this.resetFilter();
  }

  private checkExisting(tag) {
    return this.chipContent.selectedChips.indexOf(tag) < 0;
  }

  private resetFilter() {
    this.currentText = '';
    this.reFocusInputBox();
  }

  private reFocusInputBox() {
    const chipMainTextBox = $('#chipMainTextBox');

    if ($(chipMainTextBox)) {
      $(chipMainTextBox).val('').blur().focus();
    }
  }
}
