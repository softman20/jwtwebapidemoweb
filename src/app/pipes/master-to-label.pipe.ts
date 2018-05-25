import { Pipe, PipeTransform } from '@angular/core';
import { Master } from '../models/master';
import { SelectItem } from 'primeng/primeng';

@Pipe({
  name: 'masterToLabel'
})
export class LabelToMasterPipe implements PipeTransform {

  transform(source: any, values: any): any {
    let dest:Array<Master>;
    let temp:Master;
    source.forEach(element => {
      temp.Id=element.value;
      temp.Name=element.label;
      dest.push(temp);
    });
    return dest;
  }

}
