import { Role } from "./role";
import { ValidationRule } from "./validation-rule";
import { User } from "./user.model";

export class ValidationRuleUserRole {
    ValidationRule?:ValidationRule;
    RoleId:number;
    Role?:Role;
    UserId?:number;
    User?:User;

    constructor (){}
}

 