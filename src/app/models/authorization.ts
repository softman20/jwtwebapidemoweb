import { BusinessUnit } from "./business-unit";
import { Role } from "./role";
import { Master } from "./master";
import { SelectItem } from "primeng/primeng";

export class Authorization {
    UserId: number;
    Role: Role;
    BusinessUnit: BusinessUnit;
    CompanyCode: Master;
    ProcessType: SelectItem;
    ProcessTypeId: string='0';

    constructor()
    {
        this.BusinessUnit=new BusinessUnit();
        this.BusinessUnit.Id=0;
        this.CompanyCode=new Master();
        this.CompanyCode.Id=0;
    }
}
