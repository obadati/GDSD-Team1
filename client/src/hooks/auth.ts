import { AUTH_USER_KEY } from "../constants/constants";

export const useAuth = (): {
    authenticated: boolean;
    username: string;
    token: string;
    userId: number;
} => {
    const user = localStorage.getItem(AUTH_USER_KEY) || null;
    if (!user) {
        return { authenticated: false, username: "", token: "", userId: -1 };
    }

    const authUser = JSON.parse(user);
    const { token = "", username = "", adminId } = authUser;
    return { token, username, authenticated: Boolean(token), userId: adminId };
};
