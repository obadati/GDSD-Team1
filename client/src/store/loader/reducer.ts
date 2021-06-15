import { StateAction } from "..";
import { LoaderStateActions } from "./actions";

const initialState: { loading: boolean } = { loading: false };

const reducer = (state = initialState, action: StateAction) => {
    switch (action.type) {
        case LoaderStateActions.SetLoader:
            return { ...state, loading: action.payload };

        default:
            return { ...state };
    }
};

export default reducer;
