import { Component, OnInit, Input, Output } from '@angular/core';
import { Master } from '../../../models/master';
import { SelectItem } from 'primeng/primeng';
import { ValidationRule } from '../../../models/validation-rule';
import { EventEmitter } from 'protractor';
import { ValidationRuleUserRole } from '../../../models/validation-rule-user-role';
import { CompanyService } from '../../../services/company.service';
import { UserService } from '../../../services/user.service';
import { StaticDataModels } from '../../../dataModels/staticDataModels';

@Component({
  selector: 'app-selection-criteria',
  templateUrl: './selection-criteria.component.html',
  styleUrls: ['./selection-criteria.component.css']
})
export class SelectionCriteriaComponent implements OnInit {

  @Input()
  selectionCriteria: ValidationRule;
  @Input()
  withRequestType: boolean = true;

  accountGroups: Master[];
  processTypes: Array<SelectItem> = StaticDataModels.processTypes;
  requestTypes: Array<SelectItem> = StaticDataModels.requestTypes;
  companies: Master[];

  constructor(private _companyService: CompanyService, private _userService: UserService) { }

  ngOnInit() {
  }


  processTypeChanged() {
    this.validationRuleSelectionChanged();
    this.loadCompanies();
    this.loadAccountGroups();
  }

  validationRuleSelectionChanged() {
    this.selectionCriteria.ValidationRuleUserRoles = new Array<ValidationRuleUserRole>();
    
  }

  loadCompanies() {
    if (this.selectionCriteria.ProcessTypeId) {
      this._companyService.getCompanies(this._userService.getBusinessUnit().Id, this.selectionCriteria.ProcessTypeId).subscribe(
        (companyData) => {
          this.companies = companyData;
          this.selectionCriteria.CompanyCode=null;
        }
      );
    }
  }

  loadAccountGroups() {
    if (this.selectionCriteria.ProcessTypeId) {
      this._companyService.getAccountGroups(this._userService.getBusinessUnit().Id, this.selectionCriteria.ProcessTypeId).subscribe(
        (data) => {
          this.accountGroups = data;
          this.selectionCriteria.AccountGroup=null;
        }
      );
    }
  }


}
