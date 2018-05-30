import { SelectItem } from "primeng/primeng";
import { Master } from "../models/master";
import { Roles } from "../models/enums/roles";

export class StaticDataModels {

    static allProcessTypes: SelectItem[] = [{ label: 'All', value: '-1', icon: 'fa fa-globe' }, { label: 'Supplier', value: '1', icon: 'fa fa-users' }, { label: 'Customer', value: '2', icon: 'fa fa-user' }];
    static processTypes: SelectItem[] = [{ label: 'Supplier', value: '1', icon: 'fa fa-users' }, { label: 'Customer', value: '2', icon: 'fa fa-user' }];
    static allRequestTypes: SelectItem[] = [{ label: 'All', value: '-1', icon: 'fa fa-globe' }, { label: 'Creation', value: '1', icon: 'fa fa-plus' }, { label: 'Modification', value: '2', icon: 'fa fa-pencil' }];
    static requestTypes: SelectItem[] = [ { label: 'Creation', value: '1', icon: 'fa fa-plus' }, { label: 'Modification', value: '2', icon: 'fa fa-pencil' }];
static allRoles:Master[]=[
    {Id:Roles.Administrator,Name:'Administrator'},
    {Id:Roles.Provider,Name:'Provider'},
    {Id:Roles.Approver1,Name:'Approver1'},
    {Id:Roles.Approver2,Name:'Approver2'},
    {Id:Roles.Accountant,Name:'Accountant'},
    {Id:Roles.Viewer,Name:'Viewer'}
];
}
