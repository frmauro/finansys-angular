export class User {
    id: string;
    email: string;
    password: string;

    constructor(
    ){}

    static fromJson(jsonData: any): User{
        return Object.assign(new User(), jsonData);
    }

}