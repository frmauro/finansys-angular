import { BaseResourceModel } from "../../../shared/models/base-resource.model";
export class User extends BaseResourceModel {
    id?: number;
    email: string;
    password: string;
    token: string;

    constructor(
    ){
        super();
    }

    static fromJson(jsonData: any): User{
        return Object.assign(new User(), jsonData);
    }

}