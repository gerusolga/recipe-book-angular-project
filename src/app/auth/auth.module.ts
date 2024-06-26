import {NgModule} from "@angular/core";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";

import {AuthRoutingModule} from "./auth-routing.module";
import {AuthService} from "./auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    FormsModule,
    CommonModule

  ],
  providers: [AuthService]
})
export class AuthModule {
}
