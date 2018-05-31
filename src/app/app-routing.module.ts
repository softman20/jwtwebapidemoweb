import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./components/superAdmin/users/user-list/user-list.component";
import { SignUpComponent } from "./components/superAdmin/users/sign-up/sign-up.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { NgModule } from "@angular/core";
import { LayoutComponent } from "./components/appLayout/layout/layout.component";
import { OauthCompletedComponent } from "./components/oauth-completed/oauth-completed.component";
import { HomeGuard } from "./auth/home.guard";
import { HomeComponent } from "./components/home/home.component";
import { ForbiddenComponent } from "./components/forbidden/forbidden.component";
import { UserResolve } from "./resolvers/user.resolve";
import { ValidationRulesComponent } from "./components/admin/validation-rules/validation-rules.component";
import { TemplateManagementComponent } from "./components/admin/template-management/template-management.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'oauth-completed', component: OauthCompletedComponent },    
    { path: 'forbidden', component: ForbiddenComponent,canActivate:[AuthGuard] },
    {
        path: '', component: LayoutComponent, canActivate: [HomeGuard, AuthGuard],resolve:{user:UserResolve},
        children: [
            { path: '', component: HomeComponent },
            { path: 'users', component: UserListComponent },
            { path: 'sign-up', component: SignUpComponent,canActivate: [AuthGuard], data: {/* roles: ['Administrator']*/ } },
            { path: 'user/:id', component: SignUpComponent },
            {path:'validationrules',component:ValidationRulesComponent},
            {path:'templatemanagement',component:TemplateManagementComponent}

        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
