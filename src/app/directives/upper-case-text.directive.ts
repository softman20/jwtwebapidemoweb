import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[UpperCaseText]',
  host: {
    '(input)': 'ref.nativeElement.value=$event.target.value.toUpperCase()',
}
})
export class UpperCaseTextDirective {

  constructor(private ref: ElementRef) {
  }

}
