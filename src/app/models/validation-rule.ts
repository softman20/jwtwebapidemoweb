import { Master } from "./master";
import { BusinessUnit } from "./business-unit";

export class ValidationRule {
    Id:number;
    BusinessUnit:BusinessUnit;
    AccountGroup:Master;
    CompanyCode:Master;
    ProcessType:Master;
    ProcessTypeId: number=-1;   
    constructor(){
        this.BusinessUnit=new BusinessUnit();
        this.BusinessUnit.Id=-1;
        this.CompanyCode=new Master();
        this.CompanyCode.Id=-1;
        this.AccountGroup=new Master();
        this.AccountGroup.Id=-1;
    }
}
