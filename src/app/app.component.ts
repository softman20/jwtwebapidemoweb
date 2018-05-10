import { Component } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  /**
   *
   */
  constructor(private router: Router,private ngProgress: NgProgress) {
     
    this.manageRouteChangeLoader(ngProgress);
  }

  private manageRouteChangeLoader(ngProgress: NgProgress) {
    Observable.from(this.router.events)
      .filter((event) => event instanceof NavigationStart)
      .subscribe((event) => ngProgress.start());

    Observable.from(this.router.events)
      .filter((event) => (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError))
      .subscribe((event) => ngProgress.done());
  }

  
  title = 'app';
}
