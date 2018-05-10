import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ConfirmationService } from 'primeng/primeng';
import { error } from 'util';
import { BaseComponent } from '../../base/base.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  constructor(private _userService: UserService, private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private _router: Router, private ngProgress: NgProgress) { super();}

  ngOnInit() {
    this.getUsers();
  }
  editUser(sgid: string) {
    this._router.navigate(['/user/' + sgid]);
  }
  deleteUserSwal(user: User) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._userService.deleteUser(user.SgId)
          .subscribe((data) => {

            this.getUsers();
            swal(
              'Deleted!',
              'User' + user.FirstName + ' has been deleted.',
              'success'
            )
          });

      }
    });
  };
  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: `Do you want to delete ${user.FirstName} ${user.LastName} ?`,
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this._userService.deleteUser(user.SgId)
        .subscribe((data) => {
          this.toastr.success(`User ${user.FirstName} deleted successfully`);
          this.getUsers();
         
        });
       
      },
      reject: () => {
        this.toastr.info('You have rejected');
      }
    });

    //  swal('Any fool can use a computer');

  }
  cancelDeleteUser() {
    this.toastr.warning("Deleted Canceled", "message");
    swal(
      'The Internet?',
      'That thing is still around?',
      'question'
    )
  }
  getUsers() {
    // parent.loading=false;
    //this.ngProgress.start();
    this.loading = true;
    this._userService.getUsers()
      .subscribe((usersData) => {
      this.users = usersData;
      
        //    this.ngProgress.done();
        this.loading = false;
      },
        Error => { console.log(Error.message); }
      );
  }
}
