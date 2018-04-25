import { Training } from './../../entities/training';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { SearchboxService } from './../../services/searchbox/searchbox.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.less']
})
export class SearchboxComponent implements OnInit {
  private searchResult: any;

  @Input() currentTrainings: Training[] = [];
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  keyword = '';
  isHidden = false;

  constructor(
    private searchboxService: SearchboxService) {
  }

  ngOnInit() {
  }

  search(e): void {
    this.searchboxService.setKeyword(this.keyword);
    this.searchEvent.emit(this.keyword);
  }

  hidePlaceHolder(isFocused: boolean): void {
    this.isHidden = (this.keyword.length > 0) ? true : isFocused;
  }
}
