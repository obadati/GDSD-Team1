import { AUTH_USER_KEY } from "../constants/constants";

export const useAuth = (): {
    authenticated: boolean;
    username: string;
    token: string;
} => {
    const user = localStorage.getItem(AUTH_USER_KEY) || null;
    if (!user) {
        return { authenticated: false, username: "", token: "" };
    }

    const authUser = JSON.parse(user);
    let { token = "", username = "", email = "" } = authUser;
    if (!username && email) {
        username = email.split("@")[0];
    }
    return { token, username, authenticated: Boolean(token) };
};
