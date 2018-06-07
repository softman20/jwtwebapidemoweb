import { BusinessUnit } from "./business-unit";
import { Master } from "./master";

export class SelectionCriteria {

    BusinessUnit: BusinessUnit;
    AccountGroup: Master;
    CompanyCode: Master;
    ProcessType: Master;
    ProcessTypeId: number;
    RequestType: Master;
    RequestTypeId: number;
    Organization: Master;

    /**
     *
     */
    constructor(businessUnit?: BusinessUnit, processTypeId?: number, requestTypeId?: number) {
        if (businessUnit != null)
            this.BusinessUnit = businessUnit;
        if (processTypeId != null)
            this.ProcessTypeId = processTypeId;
        if (requestTypeId != null)
            this.RequestTypeId = requestTypeId;
    }

    IsValid() {
        return this.ProcessTypeId != null && this.CompanyCode != null && this.AccountGroup != null && this.Organization != null;
    }
}


