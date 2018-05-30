import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../services/company.service';
import { SelectItem, ConfirmationService, TreeNode } from 'primeng/primeng';
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
  requestTypes: Array<SelectItem> = StaticDataModels.allRequestTypes;
  allRoles: Array<Master> = StaticDataModels.allRoles;
 
  constructor(private confirmationService: ConfirmationService, private toastr: ToastrService, private _companyService: CompanyService, private _userService: UserService, private _validationUserService: ValidationRuleService) { }

  ngOnInit() {
    // this.subscriptions.push(this._userService.onBusinessUnitChanged$.subscribe(bu => { this.loadCompanies(); }));   
    // this.processTypeChanged(); 
  }

  getValidationRulePotentielUsers(edit: boolean = false) {
    this._validationUserService.getValidationRulePotentielUsers(this.validationRule).subscribe(
      (data: User[]) => {
        this.validationRuleProviders = data.filter(e => e.Authorizations.find(a => a.RoleId == Roles.Provider));
        this.validationRuleApprover1 = data.filter(e => e.Authorizations.find(a => a.RoleId == Roles.Approver1));
        this.validationRuleApprover2 = data.filter(e => e.Authorizations.find(a => a.RoleId == Roles.Approver2));
        this.validationRuleAccountants = data.filter(e => e.Authorizations.find(a => a.RoleId == Roles.Accountant));

        if (edit) {
          this.selectedValidationRuleProvider = this.validationRuleProviders.find(e => e.SgId == this.validationRule.ValidationRuleUserRoles.find(e => e.RoleId == Roles.Provider).User.SgId);
          this.selectedValidationRuleApprover1 = this.validationRuleApprover1.find(e => e.SgId == this.validationRule.ValidationRuleUserRoles.find(e => e.RoleId == Roles.Approver1).User.SgId);
          this.selectedValidationRuleApprover2 = this.validationRuleApprover2.find(e => e.SgId == this.validationRule.ValidationRuleUserRoles.find(e => e.RoleId == Roles.Approver2).User.SgId);
          this.selectedValidationRuleAccountant = this.validationRuleAccountants.find(e => e.SgId == this.validationRule.ValidationRuleUserRoles.find(e => e.RoleId == Roles.Accountant).User.SgId);
        }
      }
    )
  }
  processTypeChanged() {
    this.validationRuleSelectionChanged();
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

  showValidationRuleDialog(edit: boolean = false) {
    this.getValidationRulePotentielUsers(edit);
    if (!edit) {
      this.selectedValidationRuleProvider = null;
      this.selectedValidationRuleApprover1 = null;
      this.selectedValidationRuleApprover2 = null;
      this.selectedValidationRuleAccountant = null;
    }
    this.displayDialog = true;
  }

  addValidationRule() {
    this.validationRule.ValidationRuleUserRoles = new Array<ValidationRuleUserRole>();
    this.validationRule.ValidationRuleUserRoles.push({ Role: this.allRoles.find(e => e.Id == Roles.Provider), RoleId: Roles.Provider, User: this.selectedValidationRuleProvider });
    this.validationRule.ValidationRuleUserRoles.push({ Role: this.allRoles.find(e => e.Id == Roles.Approver1), RoleId: Roles.Approver1, User: this.selectedValidationRuleApprover1 });
    this.validationRule.ValidationRuleUserRoles.push({ Role: this.allRoles.find(e => e.Id == Roles.Approver2), RoleId: Roles.Approver2, User: this.selectedValidationRuleApprover2 });
    this.validationRule.ValidationRuleUserRoles.push({ Role: this.allRoles.find(e => e.Id == Roles.Accountant), RoleId: Roles.Accountant, User: this.selectedValidationRuleAccountant });

    this._validationUserService.addValidationRule(this.validationRule).subscribe(data => {
      this.validationRule.Id=data;
      this.displayDialog = false;
    });
  }

  getValidationRuleUserRoles() {
    this.validationRule.ProcessType = Helpers.ConvertLabelToMaster(this.processTypes).find(e => e.Id == this.validationRule.ProcessTypeId);
    this.validationRule.RequestType = Helpers.ConvertLabelToMaster(this.requestTypes).find(e => e.Id == this.validationRule.RequestTypeId);
    this.validationRule.BusinessUnit = this._userService.getBusinessUnit();

    this._validationUserService.getValidationRuleUserRoles(this.validationRule).subscribe(data => {
      this.validationRule.ValidationRuleUserRoles = data;
      
      if (data && data.length)
        this.validationRule.Id = data[0].ValidationRuleId;
      else this.validationRule.Id = 0;
    });
  }

  deleteValidationRuleDialog() {
    this.confirmationService.confirm({
      header: 'Delete Validation Rule',
      message: `Are you sur to want to delete this validation rule ?`,
      accept: () => {
        this._validationUserService.deleteValidationRule(this.validationRule.Id).subscribe(data => {
          this.validationRule.ValidationRuleUserRoles = null;
          this.toastr.success("Deleted Successfully !");
        });
      }
    });
  }

  validationRuleSelectionChanged() {
    this.validationRule.ValidationRuleUserRoles = new Array<ValidationRuleUserRole>();
  }
}
