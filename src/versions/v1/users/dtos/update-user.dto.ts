export class UpdateUserDto {
    name: string;
    email: string;
    userId: string;
    mobile?: string;
    authorize?: boolean;
    status?: boolean;
}