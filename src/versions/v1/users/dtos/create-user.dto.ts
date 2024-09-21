import { UserCode, UserRole } from "../../../../interfaces/user.interface";

export class CreateUserDto {
    name: string;
    mobile: string;
    password: string;
    email?: string;
    role?: UserRole;
    code?: UserCode;
}