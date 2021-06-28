import { UserRoles } from "../api/user";
import { AUTH_USER_KEY } from "../constants/constants";
import { AppUser } from "../models/AppUser";

export const useAuth = (): AppUser => {
    const user = localStorage.getItem(AUTH_USER_KEY) || null;
    if (!user) {
        return {
            authenticated: false,
            username: "",
            token: "",
            id: -1,
            role: UserRoles.Buyer,
            email: "",
        };
    }
    const authUser = JSON.parse(user);
    let {
        token = "",
        username = "",
        email = "",
        role = UserRoles.Buyer,
        id = -1,
    } = authUser;
    if (!username && email) {
        username = email.split("@")[0];
    }
    return {
        token,
        username,
        authenticated: Boolean(token),
        id,
        role,
        email,
    };
};
