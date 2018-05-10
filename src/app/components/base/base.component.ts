import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

 
export abstract class BaseComponent implements OnDestroy {

  protected subscriptions: Array<Subscription>;
    //public errorPanel: ErrorPanelViewModel;

    constructor() {
        this.subscriptions = new Array<Subscription>();
      //  this.errorPanel = new ErrorPanelViewModel();
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const sub of this.subscriptions) {
                sub.unsubscribe();
            }
        }
    }

}
