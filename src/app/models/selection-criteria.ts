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
    constructor(businessUnit?: BusinessUnit) {
        if (businessUnit != null)
            this.BusinessUnit = businessUnit;
    }

}


