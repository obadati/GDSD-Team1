import { StateAction } from "../index";
import { PropertiesStateActions } from "./actions";
import { PropertiesState } from "./types";

const initialState: PropertiesState = {
  properties: [],
};

const reducer = (
  state: PropertiesState = initialState,
  action: StateAction
) => {
  switch (action.type) {
    case PropertiesStateActions.SetAll: {
      return { ...state, properties: action.payload };
    }
    default:
      return { ...state };
  }
};

export default reducer;
