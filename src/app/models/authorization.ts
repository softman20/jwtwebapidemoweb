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
    ProcessTypeId: string;
}
