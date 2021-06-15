import { StateAction } from "..";

export enum LoaderStateActions {
    SetLoader = "set-loader",
}
export const setLoadingState = (state: boolean): StateAction => ({
    type: LoaderStateActions.SetLoader,
    payload: state,
});
