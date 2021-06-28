import { StateAction } from "..";
import { UserRoles } from "../../api/user";
import { AppUser } from "../../models/AppUser";
import { UserStateActions } from "./actions";

export const dummyUser: AppUser = {
    id: -1,
    username: "",
    email: "",
    token: "",
    authenticated: false,
    role: UserRoles.Buyer,
};

const reducer = (state: AppUser = dummyUser, action: StateAction) => {
    switch (action.type) {
        case UserStateActions.SetAppUser: {
            let { username = "", email = "", token } = action.payload;
            if (!username && email) {
                username = email.split("@")[0];
            }
            return {
                ...action.payload,
                username,
                authenticated: Boolean(token),
            };
        }
    }
    return { ...state };
};

export default reducer;
