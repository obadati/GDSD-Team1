import { BASE_URL } from "../constants/constants";
import { httpGET, httpPOST } from "../utility/http";

export enum UserRoles {
    Buyer = "buyer",
    Agent = "agent",
    Admin = "admin",
}

enum UserEndpoints {
    SignUp = "/api/user/",
    Login = "/api/user/login",
    GetUserInfo = "/api/user/userImage",
}

export const loginUser = (username: string, password: string, role: string) => {
    return httpPOST(`${BASE_URL}${UserEndpoints.Login}`, {
        username,
        password,
        role: role.toLowerCase(),
    });
};
export const signUpUser = (
    email: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    companyId?: string | null
) => {
    return httpPOST(`${BASE_URL}${UserEndpoints.SignUp}`, {
        firstName,
        lastName,
        email,
        role,
        companyId,
        password,
    });
};

export const getUserInfo = (id: number) => {
    return httpGET(`${BASE_URL}${UserEndpoints.GetUserInfo}/${id}`);
};
