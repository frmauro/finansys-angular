import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { LoginRoutingModule } from "./login-routing.modules";
import { LoginComponent } from "./login.component";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})

export class LoginModule {}
