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

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseComponent implements OnInit {
  user: User;
  roles: any[];
  businessUnits: BusinessUnit[];
  userSgid: string;
  editMode: boolean = false;
  constructor(private _userService: UserService, private router: Router,
    private _activatedRoute: ActivatedRoute, private toastr: ToastrService) {super(); }

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
    });


  }
  getBusinessUnits() {
    this._userService.getAllBusinessUnits().subscribe(
      (data:BusinessUnit[]) => { 
        this.businessUnits = data;
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

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
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
}


