import { Master } from "./master";
import { BusinessUnit } from "./business-unit";
import { ValidationRuleUserRole } from "./validation-rule-user-role";
import { SelectionCriteria } from "./selection-criteria";
import { Helpers } from "../helpers/helpers";
import { StaticDataModels } from "../dataModels/staticDataModels";

export class ValidationRule extends SelectionCriteria {
    Id:number;  
    ValidationRuleUserRoles:ValidationRuleUserRole[];
    

    constructor(businessUnit?: BusinessUnit) {
      super(businessUnit);
        this.ValidationRuleUserRoles=new Array<ValidationRuleUserRole>();
    }

    IsValid(){
       return this.ProcessTypeId!=null && this.CompanyCode!=null && this.AccountGroup!=null && this.RequestTypeId!=null;
    }
    
    LoadPropertiesFromID() {
       
    }
   
}
