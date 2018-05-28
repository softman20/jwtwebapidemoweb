import { BusinessUnit } from "./business-unit";
import { Role } from "./role";
import { Master } from "./master";
import { SelectItem } from "primeng/primeng";

export class Authorization {
    UserId: number;
    Role: Role;
    RoleId: number;
    BusinessUnit: BusinessUnit;
    CompanyCode: Master;
    ProcessType: Master;
    ProcessTypeId: number=-1;

    constructor()
    {
        this.BusinessUnit=new BusinessUnit();
        this.BusinessUnit.Id=-1;
        this.CompanyCode=new Master();
        this.CompanyCode.Id=-1;
    }
}
