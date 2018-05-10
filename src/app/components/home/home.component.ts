import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }
  user: User;
  ngOnInit() {
    // this.authenticationService.getUserClaims().subscribe((data) => {
    //   this.user=<User>data;
    // });
  }

}
