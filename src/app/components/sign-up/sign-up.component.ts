import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { forEach } from '@angular/router/src/utils/collection';
import { error } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from '../base/base.component';
import { BusinessUnit } from '../../models/business-unit';
import { Authorization } from '../../models/authorization';
import { Role } from '../../models/role';
import { Master } from '../../models/master';
import { CompanyService } from '../../services/company.service';
import { SelectItem, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseComponent implements OnInit {
  user: User;
  roles: Role[];
  businessUnits: BusinessUnit[];
  companies: Master[];
  userSgid: string;
  editMode: boolean = false;
  displayDialog: boolean;
  authorization: Authorization = new Authorization();

  processTypes: SelectItem[] = [{ label: 'All', value: '0', icon: 'fa fa-globe' }, { label: 'Supplier', value: '1', icon: 'fa fa-users' }, { label: 'Customer', value: '2', icon: 'fa fa-user' }];


  constructor(private _companyService: CompanyService, private _userService: UserService, private router: Router,
    private _activatedRoute: ActivatedRoute, private toastr: ToastrService, private _confirmationService: ConfirmationService) { super(); }

  ngOnInit() {
    this.resetForm();
    this._activatedRoute.params.subscribe(params => {
      this.userSgid = params['id'];
      if (this.userSgid) {
        this._userService.getUser(this.userSgid).subscribe(
          (userData) => {
            this.user = userData;
            this.editMode = true;
          }
        );
      }
      this.getRoles();
      this.getBusinessUnits();

      //this.getComanies(true);
    });


  }
  getComanies() {
    this.authorization.ProcessTypeId = '0';
    
    let buID = 0;
    if (this.authorization && this.authorization.BusinessUnit)
      buID = this.authorization.BusinessUnit.Id;

    this._companyService.getCompaniesByBU(buID).subscribe(
      (data: any) => {
        this.companies = data;
        this.authorization.CompanyCode=this.companies.find(e=>e.Id==0);
      }
    );
  }
  getBusinessUnits() {
    this._userService.getAllBusinessUnits().subscribe(
      (data: BusinessUnit[]) => {
        this.businessUnits = data;
        this.getComanies();
      }
    );
  }

  getRoles() {
    this._userService.getAllRoles().subscribe(
      (data: any) => {
        this.roles = data;
      }
    )
  }
  OnSubmit(form: NgForm) {
    //edit
    if (this.editMode) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }
  addUser() {
    this._userService.registerUser(this.user)
      .subscribe((result: boolean) => {
        if (result) {
          this.toastr.success(`User ${this.user.FirstName} Added successfully`);
          this.router.navigate(['/users']);
        } else {
          this.toastr.warning(`User ${this.user.SgId} already exist !`);
        }
      },
        (error) => {
          this.toastr.error("Error while adding user !");
        });
  }
  updateUser() {
    this._userService.updateUser(this.user, this.userSgid)
      .subscribe((data: any) => {
        //if (data.Succeeded == true)
        this.toastr.success(`User ${this.user.FirstName} Updated successfully`, "message");
        this.router.navigate(['/users']);
      });
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.user = new User();


  }

  sgIDChanged() {
    if (this.user.SgId) {
      if (this.user.SgId.length != 8)
        this.toastr.info("Please enter a valid SGID");
      else {
        //call directory service
        this._userService.getUserFromLDAP(this.user.SgId).subscribe(
          (userData) => {
            //console.log(userData);
            this.user.Email = userData.mail;
            if (userData.preferredGivenName) {
              this.user.FirstName = userData.preferredGivenName;
              // this.user.LastName = userData.preferredName;
            } else if (userData.givenName) {
              this.user.FirstName = userData.givenName;
            }
            else this.user.FirstName = userData.mail.substring(0, userData.mail.indexOf("."));

            if (userData.preferredName) {
              this.user.LastName = userData.preferredName;
            } else if (userData.sn) {
              this.user.LastName = userData.sn;
            }
            else this.user.LastName = userData.mail.substring(userData.mail.indexOf(".") + 1, userData.mail.indexOf("@"));

          },
          error => {
            this.toastr.warning("This SGID does not exist");
            let enteredSGID = this.user.SgId;
            this.resetForm();
            this.user.SgId = enteredSGID;
          }
        );

      }
    }
  }

  showDialogToAdd() {
  
    this.authorization = new Authorization();
    this.authorization.BusinessUnit=this.businessUnits.find(e=>e.Id==0);
    this.authorization.CompanyCode=this.companies.find(e=>e.Id==0);
    // this.companies = new Array<Master>();
    this.displayDialog = true;
  }
  cancelAddAuthorization() {

  }
  companyCodeChanged() {
    this.authorization.ProcessTypeId = '0';
  }
  // checkIfAuthorizationExist(): boolean {
  //   let exist: boolean = false;;
  //   //check if exist Process Type level
  //   if (this.authorization.BusinessUnit && this.authorization.CompanyCode && this.authorization.ProcessTypeId != '0') {
  //     //all values selected
  //     if (this.user.Authorizations.find(e => e.BusinessUnit ? e.BusinessUnit.Id == this.authorization.BusinessUnit.Id : true && e.CompanyCode ? e.CompanyCode.Id == this.authorization.CompanyCode.Id : true
  //       && (e.ProcessTypeId == this.authorization.ProcessTypeId || e.ProcessTypeId == '0') && e.Role.Id == this.authorization.Role.Id))
  //       exist = true;
  //   }//no process type 
  //   else if (this.authorization.BusinessUnit && this.authorization.CompanyCode && this.authorization.ProcessTypeId == '0') {
  //     if (this.user.Authorizations.find(e => e.BusinessUnit ? e.BusinessUnit.Id == this.authorization.BusinessUnit.Id : true && e.CompanyCode ? e.CompanyCode.Id == this.authorization.CompanyCode.Id : true
  //       && e.Role.Id == this.authorization.Role.Id))
  //       exist = true;
  //   }//no company code 
  //   else if (this.authorization.BusinessUnit && !this.authorization.CompanyCode) {
  //     if (this.user.Authorizations.find(e => (e.BusinessUnit ? e.BusinessUnit.Id == this.authorization.BusinessUnit.Id : true) && e.Role.Id == this.authorization.Role.Id))
  //       exist = true;
  //   }
  //   //no Business Unit
  //   else if (!this.authorization.BusinessUnit) {
  //     if (this.user.Authorizations.find(e => e.Role.Id == this.authorization.Role.Id))
  //       exist = true;
  //   }

  //   return exist;
  // }
  checkIfAuthorizationExist(): boolean {
    let exist: boolean = false;;
    //check if exist Process Type level
    if (this.authorization.BusinessUnit && this.authorization.CompanyCode && this.authorization.ProcessTypeId != '0') {
      //all values selected
      if (this.user.Authorizations.find(e => (e.BusinessUnit.Id == this.authorization.BusinessUnit.Id || e.BusinessUnit.Id == 0) 
      && (e.CompanyCode.Id == this.authorization.CompanyCode.Id || e.CompanyCode.Id==0 )
        && (e.ProcessTypeId == this.authorization.ProcessTypeId || e.ProcessTypeId == '0') && e.Role.Id == this.authorization.Role.Id))
        exist = true;
    }//no process type 
    else if (this.authorization.BusinessUnit && this.authorization.CompanyCode && this.authorization.ProcessTypeId == '0') {
      if (this.user.Authorizations.find(e => (e.BusinessUnit.Id == this.authorization.BusinessUnit.Id || e.BusinessUnit.Id==0 ) 
      && (e.CompanyCode.Id == this.authorization.CompanyCode.Id || e.CompanyCode.Id==0)
        && e.Role.Id == this.authorization.Role.Id))
        exist = true;
    }//no company code 
    else if (this.authorization.BusinessUnit && !this.authorization.CompanyCode) {
      if (this.user.Authorizations.find(e => (e.BusinessUnit.Id == this.authorization.BusinessUnit.Id || e.BusinessUnit.Id==0) && e.Role.Id == this.authorization.Role.Id))
        exist = true;
    }
    //no Business Unit
    else if (!this.authorization.BusinessUnit) {
      if (this.user.Authorizations.find(e => e.Role.Id == this.authorization.Role.Id))
        exist = true;
    }

    return exist;
  }
  addAuthorization() {

    // //it the new authorizaiton BU is set to All, check only with role
    // if (!this.authorization.BusinessUnit || this.user.Authorizations.find(e => !e.BusinessUnit)) {
    //   if (this.user.Authorizations.find(e => e.Role.Id == this.authorization.Role.Id))
    //     exist = true;
    // }//else check company code level
    // else if (!this.authorization.CompanyCode || this.user.Authorizations.find(e => !e.CompanyCode)) {
    //   if (this.user.Authorizations.find(e => e.Role.Id == this.authorization.Role.Id && e.CompanyCode.Id == this.authorization.CompanyCode.Id))
    //     exist = true;
    // }
    // else if (this.user.Authorizations.find(e => e.BusinessUnit.Id == this.authorization.BusinessUnit.Id && e.CompanyCode.Id == this.authorization.CompanyCode.Id
    //   && e.ProcessTypeId == this.authorization.ProcessTypeId && e.Role.Id == this.authorization.Role.Id))
    //   exist = true;
    
    if (false)
      this.toastr.warning('This authorization already exist !');
    else {

      //get ProcessType
      this.authorization.ProcessType = this.processTypes.find(e => e.value == this.authorization.ProcessTypeId);

      let authorizations = [...this.user.Authorizations];
      authorizations.push(this.authorization);
      this.user.Authorizations = authorizations;
      this.authorization = new Authorization();
      this.displayDialog = false;
    }
  }

  deleteAuthorization(authorization: Authorization) {
    this._confirmationService.confirm({
      message: `Are you sure to want to delete this ${authorization.BusinessUnit.Name} authorization ?`,
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.user.Authorizations = this.user.Authorizations.filter(item => item !== authorization);
        this.toastr.info('Delete successfully !');
      }
    });

  }
}


