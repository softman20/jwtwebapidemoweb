import { SelectItem } from "primeng/primeng";

export class StaticDataModels {

    static processTypes: SelectItem[] = [{ label: 'All', value: '-1', icon: 'fa fa-globe' }, { label: 'Supplier', value: '1', icon: 'fa fa-users' }, { label: 'Customer', value: '2', icon: 'fa fa-user' }];
    static requestTypes: SelectItem[] = [{ label: 'All', value: '-1', icon: 'fa fa-globe' }, { label: 'Creation', value: '1', icon: 'fa fa-plus' }, { label: 'Modification', value: '2', icon: 'fa fa-pencil' }];

}
