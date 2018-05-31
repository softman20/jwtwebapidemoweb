import { Component, OnInit, Input, Output } from '@angular/core';
import { Master } from '../../../models/master';
import { SelectItem } from 'primeng/primeng';
import { ValidationRule } from '../../../models/validation-rule';
import { EventEmitter } from 'protractor';
import { ValidationRuleUserRole } from '../../../models/validation-rule-user-role';
import { CompanyService } from '../../../services/company.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-selection-criteria',
  templateUrl: './selection-criteria.component.html',
  styleUrls: ['./selection-criteria.component.css']
})
export class SelectionCriteriaComponent implements OnInit {
  @Input()
  companies: Master[];
  @Input()
  processTypes: Array<SelectItem>;
  @Input()
  validationRule: ValidationRule;
  @Input()
  requestTypes: Array<SelectItem>;
  @Input()
  accountGroups: Master[];

 

  constructor(private _companyService: CompanyService, private _userService: UserService) { }

  ngOnInit() {
  }
   

  processTypeChanged() {
    this.validationRuleSelectionChanged();
    this.loadCompanies();
    this.loadAccountGroups();
    // this.validationRule = new ValidationRule();
  }

  validationRuleSelectionChanged() {
    this.validationRule.ValidationRuleUserRoles = new Array<ValidationRuleUserRole>();
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
}
