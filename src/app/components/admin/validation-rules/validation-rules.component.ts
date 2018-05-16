import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../services/company.service';
import { SelectItem } from 'primeng/primeng';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-validation-rules',
  templateUrl: './validation-rules.component.html',
  styleUrls: ['./validation-rules.component.css']
})
export class ValidationRulesComponent implements OnInit {
  selectedProcessType: string = '';
  selectedRequestType: string = '';
  selectedCompanyCode: any = null;
  companies: any[];
  subscriptions: Array<Subscription> = new Array<Subscription>();

  processTypes: SelectItem[] = [{ label: 'Supplier', value: '1', icon: 'fa fa-users' }, { label: 'Customer', value: '2', icon: 'fa fa-user' }];
  requestTypes: SelectItem[] = [{ label: 'Creation', value: '1', icon: 'fa fa-plus' }, { label: 'Modification', value: '2', icon: 'fa fa-pencil' }];

  constructor(private toastr: ToastrService, private _companyService: CompanyService, private _userService: UserService) { }

  ngOnInit() {
    this.subscriptions.push(this._userService.onBusinessUnitChanged$.subscribe(bu => { this.loadCompanies(); }));
  }

  processTypeChanged() {

    this.loadCompanies();
    this.selectedCompanyCode = null;
  }

  loadCompanies() {
    if (this.selectedProcessType) {
      this._companyService.getCompanies(this._userService.getBusinessUnit().Id, this.selectedProcessType).subscribe(
        (companyData) => {
          this.companies = companyData;
        }
      );
    }
  }
}
