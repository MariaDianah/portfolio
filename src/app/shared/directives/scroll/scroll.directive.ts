import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective {

  @Output() scrollToEnd: EventEmitter<void> = new EventEmitter<void>();

  private _event: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _elementRef: ElementRef<HTMLElement>) {
    this._event.pipe(debounceTime(500)).subscribe(event => {
      if (event) this.scrollToEnd.emit();
    });
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if ((this._elementRef.nativeElement.scrollWidth + this._elementRef.nativeElement.scrollTop) >= (this._elementRef.nativeElement.scrollHeight + 5)) {
      this._event.next(true);
    }
  }

}
