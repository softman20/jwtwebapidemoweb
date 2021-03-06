import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { BusinessUnit } from '../../../models/business-unit';
import { User } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //businessUnits:Array<BusinessUnit>;
  user: User;
  allUsers: User[];
  selectedBusinessUnit: BusinessUnit;
  oldBusinessUnit: BusinessUnit;
  userToSwitch: User;
  constructor(private router: Router,private confirmationService: ConfirmationService, private activatedRoute: ActivatedRoute, private toastr: ToastrService,
    private _userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    //get BUs
    this.user = <User>this.activatedRoute.snapshot.data['user'];
    this.selectedBusinessUnit = this._userService.getBusinessUnit();
  }

  loadAllUsers() {
    this.userToSwitch = null;
    this._userService.getAllUsers().subscribe(data => {
      this.allUsers = data;
    });
  }
  onBusinessUnitClicked() {
    if (!this.oldBusinessUnit)
      this.oldBusinessUnit = this.selectedBusinessUnit;
  }
  onBusinessUnitChanged(BusinessUnit: BusinessUnit) {
    swal({
      title: `Business Unit Confirmation`,
      text: `Are you sure to want to change the active Business Unit from  ${this.oldBusinessUnit.Name} to ${BusinessUnit.Name} ?`,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this._userService.setBusinessUnit(BusinessUnit.Id);
        this.toastr.info(`${this._userService.getBusinessUnit().Name} is Active now !`);
        this.router.navigate(['/']);
      } else {
        this.selectedBusinessUnit = this.oldBusinessUnit;

      }
      this.oldBusinessUnit = null;
    });


  }

  logout() {
    // alert(0);
    this.confirmationService.confirm({
      header: 'Close session',
      message: 'Are you sur to want to logout ?',
      accept: () => {
        this.toastr.info("Closing your session ...");
        this.authenticationService.logout();
      }
    })

  }

  switchUser() {
    this.confirmationService.confirm({
      header: 'Switch User',
      message: `Are you sur to want to switch current user to ${this.userToSwitch.FirstName} ${this.userToSwitch.LastName} ?`,
      accept: () => {
        this.toastr.info("Switching to user : " + this.userToSwitch.FirstName+' '+this.userToSwitch.LastName + ' ...');
        this.authenticationService.logout();
        window.location.href = `${environment.API_ENDPOINT}/login-callback?switchsgid=${this.userToSwitch.SgId}`;
      }
    });
  }
}
