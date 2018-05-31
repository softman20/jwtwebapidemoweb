import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: User;
  constructor(private activatedRoute: ActivatedRoute,
    private _userService :UserService,private authenticationService: AuthenticationService) { }

  ngOnInit() {
   this.user = <User>this.activatedRoute.snapshot.data['user'];
   }

}
