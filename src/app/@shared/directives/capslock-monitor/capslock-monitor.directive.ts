import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[capslockMonitor]'
})
export class CapslockMonitorDirective {

  @Output() capslockMonitor = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const capslockState = event.getModifierState && event.getModifierState('CapsLock');
    this.capslockMonitor.emit(capslockState);
  }
}
