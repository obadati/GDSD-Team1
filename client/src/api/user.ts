import { httpPOST } from "../utility/http";
export enum UserRoles {
    Admin = "admin",
    Buyer = "buyer",
    Seller = "agent",
}

export const loginUser = (
    username: string,
    password: string,
    role: UserRoles = UserRoles.Buyer
) => {
    return httpPOST("http://18.185.96.197:5000/api/user/login", {
        username,
        password,
        role,
    });
};
