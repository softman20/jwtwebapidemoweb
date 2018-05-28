import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../services/company.service';
import { SelectItem } from 'primeng/primeng';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Master } from '../../../models/master';
import { ValidationRule } from '../../../models/validation-rule';
import { ValidationRuleUserRole } from '../../../models/validation-rule-user-role';
import { Role } from '../../../models/role';
import { User } from '../../../models/user.model';
import { ValidationRuleService } from '../../../services/validation-rule.service';
import { StaticDataModels } from '../../../dataModels/staticDataModels';
import { Helpers } from '../../../helpers/helpers';
import { Roles } from '../../../models/enums/roles';

@Component({
  selector: 'app-validation-rules',
  templateUrl: './validation-rules.component.html',
  styleUrls: ['./validation-rules.component.css']
})
export class ValidationRulesComponent implements OnInit {
  selectedProcessType: string = '';
  selectedRequestType: string = '';
  selectedCompanyCode: Master = null;
  selectedAccountGroup:Master=null;
  companies: Master[];
  accountGroups:Master[];
  displayDialog:boolean=false;
  validationRule:ValidationRule=new ValidationRule();
  validationRuleUserRole:ValidationRuleUserRole=new ValidationRuleUserRole();
  validationRuleProviders:User[];
  validationRuleApprover1:User[];
  selectedValidationRuleProvider:any;
  selectedValidationRuleApprover1:any;
  subscriptions: Array<Subscription> = new Array<Subscription>();
  processTypes: Array<SelectItem> = StaticDataModels.processTypes;
  
 // processTypes: SelectItem[] = [{ label: 'Supplier', value: '1', icon: 'fa fa-users' }, { label: 'Customer', value: '2', icon: 'fa fa-user' }];
  requestTypes: SelectItem[] = [{ label: 'Creation', value: '1', icon: 'fa fa-plus' }, { label: 'Modification', value: '2', icon: 'fa fa-pencil' }];

  constructor(private toastr: ToastrService, private _companyService: CompanyService, private _userService: UserService,private _validationUserService:ValidationRuleService) { }

  ngOnInit() {
   // this.subscriptions.push(this._userService.onBusinessUnitChanged$.subscribe(bu => { this.loadCompanies(); }));
   
  }

  getValidationRuleProviders() {
    this._validationUserService.getValidationRuleProviders(this.validationRule).subscribe(
      (data: User[]) => {
        this.validationRuleProviders = data.filter(e=>e.Authorizations.find(a=>a.RoleId==Roles.Provider));
        this.validationRuleApprover1 = data.filter(e=>e.Authorizations.find(a=>a.RoleId==Roles.Approver1));
      }
    )
  }
  processTypeChanged() {

    this.loadCompanies();
    this.loadAccountGroups();
   // this.validationRule = new ValidationRule();
  }

  loadCompanies() {
    if (this.validationRule.ProcessTypeId) {
      this._companyService.getCompanies(this._userService.getBusinessUnit().Id, this.validationRule.ProcessTypeId).subscribe(
        (companyData) => {
          this.companies = companyData;
        }
      );
    }
  }

  loadAccountGroups() {
    if (this.validationRule.ProcessTypeId) {
      this._companyService.getAccountGroups(this._userService.getBusinessUnit().Id, this.validationRule.ProcessTypeId).subscribe(
        (data) => {
          this.accountGroups = data;
        }
      );
    }
  }

  showNewValidationRuleDialog(){
    this.validationRule.ProcessType = Helpers.convertLabelToMaster(this.processTypes).find(e => e.Id == this.validationRule.ProcessTypeId);
    this.validationRule.BusinessUnit=this._userService.getBusinessUnit();

    this.getValidationRuleProviders();
    this.displayDialog=true;
  }
}
