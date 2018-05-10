import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToIds'
})
export class ArrayToFieldPipe implements PipeTransform {

  transform(items: any, values: any): any {
    items = items ? items.map(e =>e?e[values]? e[values].toString():e[values]:null) : null;
    return items;
  }

}
