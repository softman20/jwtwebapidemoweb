import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { Authorization } from '../../../../models/authorization';
import { BusinessUnit } from '../../../../models/business-unit';
import { Master } from '../../../../models/master';
import { Role } from '../../../../models/role';
import { User } from '../../../../models/user.model';
import { CompanyService } from '../../../../services/company.service';
import { UserService } from '../../../../services/user.service';
import { BaseComponent } from '../../../base/base.component';
import { Helpers } from '../../../../helpers/helpers';
import { StaticDataModels } from '../../../../dataModels/staticDataModels';
import { OrganizationService } from '../../../../services/organization.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseComponent implements OnInit {
  user: User = new User();
  roles: Role[] = StaticDataModels.allRoles;
  businessUnits: BusinessUnit[];
  companies: Master[];
  organizations: Master[];
  userSgid: string;
  editMode: boolean = false;
  displayDialog: boolean;
  authorization: Authorization = new Authorization();
  loading: boolean = false;
  processTypes: Array<SelectItem> = StaticDataModels.allProcessTypes;

  constructor(private _companyService: CompanyService, private _userService: UserService, private _organizationService: OrganizationService, private router: Router,
    private _activatedRoute: ActivatedRoute, private toastr: ToastrService, private _confirmationService: ConfirmationService) { super(); }

  ngOnInit() {
    this.resetForm();
    this._activatedRoute.params.subscribe(params => {
      this.userSgid = params['id'];
      if (this.userSgid) {
        this.loading = true;
        this._userService.getUser(this.userSgid).subscribe(
          (userData) => {
            this.user = userData;
            this.editMode = true;
            this.loading = false;
          }
        );
      }

      this.getBusinessUnits();
      this.getOrganizations();
    });


  }
  getComanies() {
    this.authorization.ProcessTypeId = -1;

    this._companyService.getCompaniesByBU(this.authorization.BusinessUnit.Id).subscribe(
      (data: any) => {
        this.companies = data;
        this.authorization.CompanyCode = this.companies.find(e => e.Id == -1);
      }
    );
  }

  getOrganizations() {
    this._organizationService.getOrganizations(this.authorization.BusinessUnit.Id, this.authorization.ProcessTypeId).subscribe(data => {
      this.organizations = data;
      this.authorization.Organization = this.organizations.find(e => e.Id == -1);
    });
  }
  processTypeChanged() {
    this.getOrganizations();
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
  OnSubmit(form: NgForm, avatarImg: any = null) {
    if (this.user.Authorizations.length > 0) {
      //edit
      if (this.editMode) {
        this.manageUserAvatar(avatarImg);
        this.updateUser();
      } else {
        this.addUser();
      }
    } else this.toastr.info("Please add some authorizations...");
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
    //this.avatarSrc="";
  }

  sgIDChanged(imgAvatar) {
    if (this.user.SgId) {
      if (this.user.SgId.length != 8) {
        this.resetForm();
        this.toastr.info("Please enter a valid SGID");
      }
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
            this.user.Gender = (userData.personalTitle != null && userData.personalTitle != "") ? userData.personalTitle == 'Mr' ? "M" : "F" : "";

            this.manageUserAvatar(imgAvatar);

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
    this.authorization.BusinessUnit = this.businessUnits.find(e => e.Id == -1);
    this.authorization.CompanyCode = this.companies.find(e => e.Id == -1);
    this.authorization.Organization = this.organizations.find(e => e.Id == -1);
    this.getComanies();
    this.displayDialog = true;
  }
  cancelAddAuthorization() {

  }
  companyCodeChanged() {
    this.authorization.ProcessTypeId = -1;
  }

  checkIfAuthorizationExist(): boolean {
    let exist: boolean = false;

    //check if exist Organization level
    if (this.authorization.ProcessTypeId != -1) {
      if (this.user.Authorizations.find(e =>
        (e.BusinessUnit.Id == this.authorization.BusinessUnit.Id || e.BusinessUnit.Id == -1)
        && (e.CompanyCode.Id == this.authorization.CompanyCode.Id || e.CompanyCode.Id == -1)
        && (e.ProcessTypeId == this.authorization.ProcessTypeId || e.ProcessTypeId == -1)
        && (e.Organization.Id == this.authorization.Organization.Id || e.Organization.Id == -1)
        &&  e.Role.Id == this.authorization.Role.Id))
        exist = true;
    }
    //check if exist Process Type level
    else if (this.authorization.CompanyCode.Id != -1) {
      if (this.user.Authorizations.find(e =>
        (e.BusinessUnit.Id == this.authorization.BusinessUnit.Id || e.BusinessUnit.Id == -1)
        && (e.CompanyCode.Id == this.authorization.CompanyCode.Id || e.CompanyCode.Id == -1)
        && (e.ProcessTypeId == this.authorization.ProcessTypeId || e.ProcessTypeId == -1)
        && e.Role.Id == this.authorization.Role.Id))
        exist = true;
    }
    //no company code 
    else if (this.authorization.BusinessUnit.Id != -1) {
      if (this.user.Authorizations.find(e =>
        (e.BusinessUnit.Id == this.authorization.BusinessUnit.Id || e.BusinessUnit.Id == -1)
        && (e.CompanyCode.Id == this.authorization.CompanyCode.Id || e.CompanyCode.Id == -1)
        && e.Role.Id == this.authorization.Role.Id))
        exist = true;
    }
    //no Business Unit
    else //if (this.authorization.BusinessUnit.Id == 0) {
    {
      if (this.user.Authorizations.find(e =>
        (e.BusinessUnit.Id == this.authorization.BusinessUnit.Id || e.BusinessUnit.Id == -1)
        && e.Role.Id == this.authorization.Role.Id))
        exist = true;
    }

    return exist;
  }

  addAuthorization() {

    if (this.checkIfAuthorizationExist())
      this.toastr.warning('This authorization already exist !');
    else {

      //get ProcessType
      this.authorization.ProcessType = Helpers.ConvertLabelToMaster(this.processTypes).find(e => e.Id == this.authorization.ProcessTypeId);
      //delete sub authorizations if exist
      this.deleteSubAuthorizationIfExist();
      let authorizations = [...this.user.Authorizations];
      authorizations.push(this.authorization);

      this.user.Authorizations = authorizations;
      this.authorization = new Authorization();
      this.displayDialog = false;
    }
  }

  deleteSubAuthorizationIfExist() {
    let subAuthorizaitons = new Array<Authorization>();
    //if new authorization is on BU level, delete all BU for same role
    if (this.authorization.BusinessUnit.Id == -1) {
      subAuthorizaitons = this.user.Authorizations.filter(e => e.Role.Id == this.authorization.Role.Id);
    } //no company code 
    else if (this.authorization.CompanyCode.Id == -1) {
      subAuthorizaitons = this.user.Authorizations.filter(e =>
        e.BusinessUnit.Id == this.authorization.BusinessUnit.Id && e.Role.Id == this.authorization.Role.Id);
    }// no process type
    else if (this.authorization.ProcessTypeId == -1) {
      subAuthorizaitons = this.user.Authorizations.filter(e =>
        e.CompanyCode.Id == this.authorization.CompanyCode.Id &&
        e.BusinessUnit.Id == this.authorization.BusinessUnit.Id && e.Role.Id == this.authorization.Role.Id);
    }
    else if (this.authorization.Organization.Id == -1) {
      subAuthorizaitons = this.user.Authorizations.filter(e =>
        e.ProcessTypeId== this.authorization.ProcessTypeId &&
        e.CompanyCode.Id == this.authorization.CompanyCode.Id &&
        e.BusinessUnit.Id == this.authorization.BusinessUnit.Id && e.Role.Id == this.authorization.Role.Id);
    }
    this.user.Authorizations = this.user.Authorizations.filter(e => !subAuthorizaitons.find(a => a === e));
  }

  deleteAuthorization(authorization: Authorization) {
    this._confirmationService.confirm({
      message: `Are you sure to want to delete this ${authorization.BusinessUnit.Name} authorization ?`,
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.user.Authorizations = this.user.Authorizations.filter(item => item !== authorization);
        this.toastr.success('Authorization Deleted successfully !');
      }
    });

  }
  manageUserAvatar(avatarImg) {
    if (!this.user.ValidAvatar) {
      avatarImg.src = `../../../../../assets/img/avatars/icon-${this.user.Gender}.png`;
    }
  }

  avatarLoaded(avatarImg: any, isError: boolean = false) {
    this.user.ValidAvatar = false;
    // avatarImg.style.display='';
    if (!isError && avatarImg.src.startsWith("http://whiteyellowpages")) {
      this.user.ValidAvatar = true;
    } else if (isError && this.user.Gender)
      // avatarImg.style.display='none';
      avatarImg.src = `../../../../../assets/img/avatars/icon-${this.user.Gender}.png`;
  }

  isSuperAdminClick() {
    alert(1);
  }
}


