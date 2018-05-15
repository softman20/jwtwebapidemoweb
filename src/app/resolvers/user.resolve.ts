import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";

@Injectable()
export class UserResolve implements Resolve<any> {

    /**
     *
     */
    constructor(private userService : UserService) {
        
    }

    resolve(route:ActivatedRouteSnapshot){
            return this.userService.get();
    }
}
