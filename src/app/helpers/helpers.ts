import { Master } from "../models/master";
import { SelectItem, TreeNode } from "primeng/primeng";
import { ValidationRuleUserRole } from "../models/validation-rule-user-role";

export class Helpers {

    
 static ConvertLabelToMaster(source:Array<SelectItem>):Array<Master>{
    let dest:Array<Master>=new Array<Master>();
   
    source.forEach(element => {
      let temp:Master=new Master();
      temp.Id=element.value;
      temp.Name=element.label;
      dest.push(temp);
    });
    return dest;
  }

  static ConvertValidationRuleToOrgChartArray(source:Array<ValidationRuleUserRole>):TreeNode[]
  {
    let data: TreeNode[]= [{
      label: 'Validation Process',
      expanded: true,
      data: {name:'', '': ''},
      children:[]
  }];
    source.forEach(element => {
      data[0].children.push({
                label: element.Role.Name,
                type: 'person',
                styleClass: 'ui-person',             
                data: {name:element.User.FirstName+' '+element.User.LastName},
               
            });
    });

    return data;
  }
}
