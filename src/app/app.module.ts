import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserXhr, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { NavbarComponent } from './components/appLayout/navbar/navbar.component';
import { SidebarComponent } from './components/appLayout/sidebar/sidebar.component';
import { TablesComponent } from './components/tables/tables.component';
import { DataTableModule, SliderModule,CheckboxModule, DropdownModule, MultiSelectModule,ProgressSpinnerModule, ConfirmationService, ConfirmDialogModule, AutoCompleteModule, SelectButtonModule, InputSwitchModule, DialogModule, OrganizationChartModule, ToggleButtonModule, InplaceModule, InputMaskModule } from 'primeng/primeng';
import { CarService } from './services/car.service';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/superAdmin/users/sign-up/sign-up.component';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/superAdmin/users/user-list/user-list.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgProgressModule, NgProgressBrowserXhr,NgProgressInterceptor  } from 'ngx-progressbar';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/appLayout/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { OauthCompletedComponent } from './components/oauth-completed/oauth-completed.component';
import { HomeGuard } from './auth/home.guard';
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './auth/auth.service';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ArrayToFieldPipe } from './pipes/array-to-ids.pipe';
import { BusinessUnitService } from './services/business-unit.service';
import { UserResolve } from './resolvers/user.resolve';
import { ValidationRulesComponent } from './components/admin/validation-rules/validation-rules.component';
import { CompanyService } from './services/company.service';
import { UserToSelectItemPipe } from './pipes/user-to-select-item.pipe';
import { ValidationRuleService } from './services/validation-rule.service';
import { ValidationRuleToOrgChartArrayPipe } from './pipes/validation-rule-to-org-chart-array.pipe';
import { GetUserAvatarSrcPipe } from './pipes/get-user-avatar-src.pipe';
import { TemplateManagementComponent } from './components/admin/template-management/template-management.component';
import { SelectionCriteriaComponent } from './components/common/selection-criteria/selection-criteria.component';
import { TemplateManagementService } from './services/template-management.service';
import { OrganizationService } from './services/organization.service';
import { SupplierCreationComponent } from './components/Supplier/supplier-creation/supplier-creation.component';
import { ControlGeneratorComponent } from './components/common/control-generator/control-generator.component';
import { CustomerCreationComponent } from './components/Customer/customer-creation/customer-creation.component';
import { UpperCaseTextDirective } from './directives/upper-case-text.directive';
import { MasterToValuePipe } from './pipes/master-to-value.pipe';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { GroupByPipe } from './pipes/group-by.pipe';
 
 
// export function authorizationServiceFactory(injector: Injector) {
//   return new AuthService(injector);
// }

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NavbarComponent,
    SidebarComponent,
    TablesComponent,
    SignUpComponent,
    UserListComponent,
    LoginComponent,
    LayoutComponent,
    OauthCompletedComponent,
    HomeComponent,
    ForbiddenComponent,
    ArrayToFieldPipe,
    ValidationRulesComponent,
    UserToSelectItemPipe,
    ValidationRuleToOrgChartArrayPipe,
    GetUserAvatarSrcPipe,
    TemplateManagementComponent,
    SelectionCriteriaComponent,
    SupplierCreationComponent,
    ControlGeneratorComponent,
    CustomerCreationComponent,
    UpperCaseTextDirective,
    MasterToValuePipe,
    OnlyNumberDirective,
    GroupByPipe
     
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    HttpClientModule,
    SliderModule,
    CheckboxModule,
    DropdownModule,
    MultiSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgProgressModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    SelectButtonModule,
    InputSwitchModule,
    DialogModule,
    OrganizationChartModule,
    ToggleButtonModule,
    InplaceModule,
    InputMaskModule
  ],
  providers: [CarService, UserService,ConfirmationService,AuthGuard,HomeGuard,AuthenticationService,
    BusinessUnitService,CompanyService,ValidationRuleService,TemplateManagementService,OrganizationService,
    UserResolve,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
