import { StateAction } from "..";
import { AppUser } from "../../models/AppUser";

export const setAppUser = (payload: AppUser): StateAction => ({
    type: UserStateActions.SetAppUser,
    payload,
});

export enum UserStateActions {
    SetAppUser = "set-app-user",
}
