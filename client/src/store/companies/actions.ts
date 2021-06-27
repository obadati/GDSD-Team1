import { StateAction } from "..";

export enum CompaniesStateActions {
    SetAll = "set-all-companies",
}

export const setAllCompanies = (companies: any[] = []): StateAction => ({
    type: CompaniesStateActions.SetAll,
    payload: [...companies],
});
