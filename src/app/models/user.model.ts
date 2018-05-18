import { BusinessUnit } from "./business-unit";
import { Authorization } from "./authorization";

export class User {
    //Id?:number=0;
    FirstName:string;
    LastName:string;
    SgId:string;
    Email:string;
    IsActive?:boolean;
    CreatedDate?:Date;
    Roles:string[];
    BusinessUnits:BusinessUnit[]=new Array<BusinessUnit>();
    BusinessUnitsId:number[];
    Authorizations:Authorization[]=new Array<Authorization>();
}
