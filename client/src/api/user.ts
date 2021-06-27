import { httpPOST } from "../utility/http";

export enum UserRoles {
    Buyer = "buyer",
    Agent = "agent",
    Admin = "admin",
}

enum UserEndpoints {
    SignUp = "/api/user/",
    Login = "/api/user/login",
}

export const loginUser = (username: string, password: string, role: string) => {
    return httpPOST("http://18.185.96.197:5000", {
        username,
        password,
        role: role.toLowerCase(),
    });
};
export const signUpUser = (
    username: string,
    password: string,
    role: string
) => {
    return httpPOST("http://18.185.96.197:5000", {
        username,
        password,
        role: role.toLowerCase(),
    });
};
