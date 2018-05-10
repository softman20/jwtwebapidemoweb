import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  public sso(){
    this.authenticationService.goToSSO();
  }
}
