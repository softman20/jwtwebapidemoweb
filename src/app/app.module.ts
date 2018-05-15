import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserXhr, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TablesComponent } from './components/tables/tables.component';
import { DataTableModule, SliderModule,CheckboxModule, DropdownModule, MultiSelectModule,ProgressSpinnerModule, ConfirmationService, ConfirmDialogModule, AutoCompleteModule } from 'primeng/primeng';
import { CarService } from './services/car.service';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgProgressModule, NgProgressBrowserXhr,NgProgressInterceptor  } from 'ngx-progressbar';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
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
    ArrayToFieldPipe
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
    AutoCompleteModule
  ],
  providers: [CarService, UserService,ConfirmationService,AuthGuard,HomeGuard,AuthenticationService,
    BusinessUnitService,
    UserResolve,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
