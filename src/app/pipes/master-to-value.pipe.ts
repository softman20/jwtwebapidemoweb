import { Pipe, PipeTransform } from '@angular/core';
import { Master } from '../models/master';
import { SelectItem } from 'primeng/primeng';

@Pipe({
  name: 'masterToValue'
})
export class MasterToValuePipe implements PipeTransform {

  transform(source: Master[]): SelectItem[] {
    if (!source)
    return undefined;
  return source.map(u => ( {label:  u.Name, value: u.Id }));
  }

}
