import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-oauth-completed',
  templateUrl: './oauth-completed.component.html',
  styleUrls: ['./oauth-completed.component.css']
})
export class OauthCompletedComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    let token = this.route.snapshot.queryParams["token"];
    let returnUrl = this.route.snapshot.queryParams["returnurl"];
    this.authenticationService.setToken(token);
    if(returnUrl){
      this.router.navigate([returnUrl]);
    } else {
      this.router.navigate(['']);
    }
  }

}
