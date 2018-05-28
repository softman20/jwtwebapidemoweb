import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';
import { SelectItem } from 'primeng/primeng';

@Pipe({
  name: 'userToSelectItem'
})
export class UserToSelectItemPipe implements PipeTransform {

  transform(users: User[]): SelectItem[] {
    if (!users)
      return undefined;
    return users.map(u => ( {FirstName:u.FirstName, label:  u.FirstName + ' ' + u.LastName+ ' -- ('+u.SgId+')', value: u.SgId }));
  }

}
