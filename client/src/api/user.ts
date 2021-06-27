import { httpPOST, httpGET } from "../utility/http";

export enum UserRoles {
    Buyer = "buyer",
    Agent = "agent",
    Admin = "admin",
}

export enum UserEndpoints {
    GetUserInfo = "/api/user/userImage",
}

export const BASE_URL = "http://18.185.96.197:5000";

export const loginUser = (username: string, password: string, role: string) => {
    return httpPOST("http://18.185.96.197:5000/api/user/login", {
        username,
        password,
        role: role.toLowerCase(),
    });
};

export const getUserInfo = (id: number) => {
    return httpGET(`${BASE_URL}${UserEndpoints.GetUserInfo}/${id}`);
};
