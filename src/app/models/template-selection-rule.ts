import { SelectionCriteria } from "./selection-criteria";
import { ValidationRuleUserRole } from "./validation-rule-user-role";
import { Helpers } from "../helpers/helpers";
import { StaticDataModels } from "../dataModels/staticDataModels";
import { BusinessUnit } from "./business-unit";

export class TemplateSelectionRule extends SelectionCriteria {
    Id:number;  
    ValidationRuleUserRoles:ValidationRuleUserRole[];
    

    constructor(businessUnit:BusinessUnit){
      super(businessUnit);
        this.ValidationRuleUserRoles=new Array<ValidationRuleUserRole>();
    }

    IsValid(){
       return this.ProcessTypeId!=null && this.CompanyCode!=null && this.AccountGroup!=null;
    }
    
    LoadPropertiesFromID() {
       // this.ProcessType = Helpers.ConvertLabelToMaster(StaticDataModels.processTypes).find(e => e.Id == this.ProcessTypeId);
    }
}
