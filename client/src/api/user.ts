import { httpPOST } from "../utility/http";

export enum UserRoles {
    Buyer = "buyer",
    Agent = "agent",
    Admin = "admin",
}

export const loginUser = (username: string, password: string, role: string) => {
    return httpPOST("http://18.185.96.197:5000/api/user/login", {
        username,
        password,
        role: role.toLowerCase(),
    });
};
