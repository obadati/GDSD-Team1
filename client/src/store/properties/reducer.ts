import { StateAction } from "../index";
import { PropertiesStateActions } from "./actions";
import { PropertiesState } from "./types";

const initialState: PropertiesState = {
  properties: [],
  agentProperties: [],
};

const reducer = (
  state: PropertiesState = initialState,
  action: StateAction
) => {
  switch (action.type) {
    case PropertiesStateActions.SetAll: {
      return { ...state, properties: action.payload };
    }

    case PropertiesStateActions.SetAgentProperties: {
      return { ...state, agentProperties: action.payload };
    }
    default:
      return { ...state };
  }
};

export default reducer;
