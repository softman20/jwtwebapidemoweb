import { Role } from "./role";
import { ValidationRule } from "./validation-rule";
import { User } from "./user.model";

export class ValidationRuleUserRole {
    Id:number;
    ValidationRule:ValidationRule;
    Role:Role;
    User:User;
}
