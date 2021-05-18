import { combineReducers } from "redux";
import properties from "./properties/reducer";

// add more state slices here
const reducer = combineReducers({ properties });
export type AppState = ReturnType<typeof reducer>;
export default reducer;
