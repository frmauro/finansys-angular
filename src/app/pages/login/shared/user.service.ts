import { Injectable, Injector } from "@angular/core";
import { User } from "./user.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseResourceService<User> {


    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    constructor(protected injector: Injector) {
        super("users/autenticate", injector, User.fromJson);
    }
    
} 