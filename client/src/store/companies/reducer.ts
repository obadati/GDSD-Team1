import { StateAction } from "../index";
import { CompaniesStateActions } from "./actions";
import { CompaniesState } from "./types";

const initialState: CompaniesState = {
    companies: [],
};

const reducer = (state: CompaniesState = initialState, action: StateAction) => {
    switch (action.type) {
        case CompaniesStateActions.SetAll: {
            return { ...state, companies: action.payload };
        }

        default:
            return { ...state };
    }
};

export default reducer;
