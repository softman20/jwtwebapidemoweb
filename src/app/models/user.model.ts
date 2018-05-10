import { BusinessUnit } from "./business-unit";

export class User {
    //Id?:number=0;
    FirstName:string;
    LastName:string;
    SgId:string;
    Email:string;
    IsActive?:boolean;
    CreatedDate?:Date;
    Roles:string[];
    BusinessUnits:BusinessUnit[];
    BusinessUnitsId:number[];
}
