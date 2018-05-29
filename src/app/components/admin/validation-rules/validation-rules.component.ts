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
  selectedAccountGroup: Master = null;
  companies: Master[];
  accountGroups: Master[];
  displayDialog: boolean = false;
  validationRule: ValidationRule = new ValidationRule();

  validationRuleProviders: User[];
  validationRuleApprover1: User[];
  validationRuleApprover2: User[];
  validationRuleAccountants: User[];

  selectedValidationRuleProvider: User;
  selectedValidationRuleApprover1: User;
  selectedValidationRuleApprover2: User;
  selectedValidationRuleAccountant: User;

  subscriptions: Array<Subscription> = new Array<Subscription>();
  processTypes: Array<SelectItem> = StaticDataModels.processTypes;
  requestTypes: Array<SelectItem> = StaticDataModels.requestTypes;


  constructor(private toastr: ToastrService, private _companyService: CompanyService, private _userService: UserService, private _validationUserService: ValidationRuleService) { }

  ngOnInit() {
    // this.subscriptions.push(this._userService.onBusinessUnitChanged$.subscribe(bu => { this.loadCompanies(); }));   
  }

  getValidationRulePotentielUsers() {
    this._validationUserService.getValidationRulePotentielUsers(this.validationRule).subscribe(
      (data: User[]) => {
        this.validationRuleProviders = data.filter(e => e.Authorizations.find(a => a.RoleId == Roles.Provider));
        this.validationRuleApprover1 = data.filter(e => e.Authorizations.find(a => a.RoleId == Roles.Approver1));
        this.validationRuleApprover2 = data.filter(e => e.Authorizations.find(a => a.RoleId == Roles.Approver2));
        this.validationRuleAccountants = data.filter(e => e.Authorizations.find(a => a.RoleId == Roles.Accountant));
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

  showNewValidationRuleDialog() {
    this.getValidationRulePotentielUsers();
    this.displayDialog = true;
  }

  addValidationRule() {
    this.validationRule.ValidationRuleUserRoles = new Array<ValidationRuleUserRole>();
    this.validationRule.ValidationRuleUserRoles.push({ RoleId: Roles.Provider, User: this.selectedValidationRuleProvider });
    this.validationRule.ValidationRuleUserRoles.push({ RoleId: Roles.Approver1, User: this.selectedValidationRuleApprover1 });
    this.validationRule.ValidationRuleUserRoles.push({ RoleId: Roles.Approver2, User: this.selectedValidationRuleApprover2 });
    this.validationRule.ValidationRuleUserRoles.push({ RoleId: Roles.Accountant, User: this.selectedValidationRuleAccountant });

    this._validationUserService.addValidationRule(this.validationRule).subscribe(data => {
      this.displayDialog = false;
    });
  }

  getValidationRuleUserRoles() {
    this.validationRule.ProcessType = Helpers.convertLabelToMaster(this.processTypes).find(e => e.Id == this.validationRule.ProcessTypeId);
    this.validationRule.RequestType = Helpers.convertLabelToMaster(this.requestTypes).find(e => e.Id == this.validationRule.RequestTypeId);
    this.validationRule.BusinessUnit = this._userService.getBusinessUnit();
    
    this._validationUserService.getValidationRuleUserRoles(this.validationRule).subscribe(data => {
      this.validationRule.ValidationRuleUserRoles = data;
    });
  }
}
