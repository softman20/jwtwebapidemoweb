import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Master } from '../../../models/master';
import { SelectItem } from 'primeng/primeng';
import { ValidationRule } from '../../../models/validation-rule';

import { ValidationRuleUserRole } from '../../../models/validation-rule-user-role';
import { CompanyService } from '../../../services/company.service';
import { UserService } from '../../../services/user.service';
import { StaticDataModels } from '../../../dataModels/staticDataModels';
import { SelectionCriteria } from '../../../models/selection-criteria';
import { OrganizationService } from '../../../services/organization.service';

@Component({
  selector: 'app-selection-criteria',
  templateUrl: './selection-criteria.component.html',
  styleUrls: ['./selection-criteria.component.css']
})
export class SelectionCriteriaComponent implements OnInit {

  @Input()
  selectionCriteria: SelectionCriteria;
  @Input()
  withProcessType: boolean = true;
  @Input()
  withRequestType: boolean = true;
  @Input()
  withOrganization: boolean = true;

  @Output()
  onValidationRuleSelectionChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  accountGroups: Master[];
  processTypes: Array<SelectItem> = StaticDataModels.processTypes;
  requestTypes: Array<SelectItem> = StaticDataModels.requestTypes;
  companies: Master[];
  organizations: Master[];

  constructor(private _companyService: CompanyService, private _organizationService: OrganizationService, private _userService: UserService) { }

  ngOnInit() {
    if (this.selectionCriteria.ProcessTypeId != -1)
      this.processTypeChanged();
  }


  processTypeChanged() {
    this.validationRuleSelectionChanged();
    this.loadCompanies();
    this.loadAccountGroups();
    this.loadOrganizations();
  }

  validationRuleSelectionChanged() {
    this.onValidationRuleSelectionChange.emit(true);
  }

  loadCompanies() {
    if (this.selectionCriteria.ProcessTypeId) {
      this._companyService.getCompanies(this._userService.getBusinessUnit().Id, this.selectionCriteria.ProcessTypeId).subscribe(
        (companyData) => {
          this.companies = companyData;
          this.selectionCriteria.CompanyCode = null;
        }
      );
    }
  }
  loadOrganizations() {
    if (this.selectionCriteria.ProcessTypeId) {
      this._organizationService.getOrganizations(this._userService.getBusinessUnit().Id, this.selectionCriteria.ProcessTypeId).subscribe(data => {
        this.organizations = data;
        this.selectionCriteria.Organization = this.organizations.find(e => e.Id == -1);
      });
    }
  }
  loadAccountGroups() {
    if (this.selectionCriteria.ProcessTypeId) {
      this._companyService.getAccountGroups(this._userService.getBusinessUnit().Id, this.selectionCriteria.ProcessTypeId).subscribe(
        (data) => {
          this.accountGroups = data;
          this.selectionCriteria.AccountGroup = null;
        }
      );
    }
  }


}
