import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[UpperCaseText]',
  host: {
    '(input)': 'ref.nativeElement.value=UpperCaseText=="false"?$event.target.value:$event.target.value.toUpperCase()',
}
})
export class UpperCaseTextDirective {
@Input()
UpperCaseText:boolean=true;
  constructor(private ref: ElementRef) {
  }

}
