import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'getUserAvatarSrc',
  pure:false
})
export class GetUserAvatarSrcPipe implements PipeTransform {

  transform(user: User,avatarImg:any ): string {
   let src= !user || !user.Gender? '../../../../../assets/img/avatars/icon-.png': user.ValidAvatar? `http://whiteyellowpages.eworkplace.saint-gobain.com/Photos/${user.SgId}.jpg`:`../../../../../assets/img/avatars/icon-${user.Gender}.png`;
 //console.log("converted src pipe : "+src);
   return src;
  }

}
