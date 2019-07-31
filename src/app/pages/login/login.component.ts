import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";

import { BaseResourceFormComponent } from "../../shared/components/base-resource-form/base-resource-form.component";

import { User } from "../login/shared/user.model";
import { UserService } from "../login/shared/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseResourceFormComponent<User> {

  constructor(protected userService: UserService, protected injector: Injector) {
    super(injector, new User(), userService, User.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

}
