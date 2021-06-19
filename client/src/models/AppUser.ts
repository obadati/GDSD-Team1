import { UserRoles } from "../api/user";

export interface AppUser {
    role: UserRoles;
    username: string;
    email: string;
    userId: number;
    authenticated: boolean;
    token: string;
}
