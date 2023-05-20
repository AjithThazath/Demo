/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/

import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class clickOutsideDirective {
  @Output() clickOutside = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  clickEventListerner(event) {
    const clickedInside = this.elementRef.nativeElement.contains(event);
    if (!clickedInside) {
      this.clickOutside.emit(true);
    }

  }


}
