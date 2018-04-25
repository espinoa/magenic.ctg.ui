

import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[specialCharacters]'
})
export class SpecialCharactersDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): boolean {

    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]$/;
    const res = regex.test(event.key);

    if (
      event.key === 'Escape' ||
      event.key === 'Backspace' ||
      event.key === 'Enter' ||
      event.key === 'Delete' ||
      event.key.toLowerCase().toString().indexOf('arrow') >= 0
    ) {
      return true;
    }

    return res;
  }
}
