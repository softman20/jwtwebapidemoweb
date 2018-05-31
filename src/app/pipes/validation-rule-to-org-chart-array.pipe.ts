import { Pipe, PipeTransform } from '@angular/core';
import { ValidationRuleUserRole } from '../models/validation-rule-user-role';
import { TreeNode } from 'primeng/primeng';

@Pipe({
  name: 'validationRuleToOrgChartArray'
})
export class ValidationRuleToOrgChartArrayPipe implements PipeTransform {

  transform(source: Array<ValidationRuleUserRole>): TreeNode[] {
    let data: TreeNode[]= [{
      label: 'Validation Process',
      expanded: true,
      data: {name:'', '': ''},
      children:[]
  }];

    if(source && source.length){
  
    source.forEach(element => {
      data[0].children.push({
                label: element.Role.Name,
                type: 'person',
                styleClass: 'ui-person',             
                data: {name:element.User.FirstName+' '+element.User.LastName,'avatar':'icon-'+ element.User.Gender+'.png','sgid':element.User.SgId,
              'user':element.User},
               
            });
    });

    
  }else data[0].label='No validation rule set !';
  return data;
  }

}
