import { TemplateControlConfig } from "./template-control-config";
import { Master } from "./master";

export class TemplateControl {
    Id:number;
    Label:string;
    SapTable:string;
    SapField:string;
    Value:string;
    ProcessTypeId:number;
    BUId:number;
    ControlMasterData:Master[];
    TemplateControlConfig?:TemplateControlConfig;
}
