import { combineReducers } from "redux";
import properties from "./properties/reducer";
import navigation from "./navigation/reducer";
import loader from "./loader/reducer";
import user from "./user/reducer";
import companies from "./companies/reducer";

// add more state slices here
const reducer = combineReducers({
    properties,
    navigation,
    loader,
    user,
    companies,
});
export type AppState = ReturnType<typeof reducer>;
export default reducer;
