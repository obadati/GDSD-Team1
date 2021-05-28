import { StateAction } from "..";
import { AppRoutes } from "../../containers/Router/routes";
import { NavigationState, NavigationStateActions } from "./types";

const initialState: NavigationState = {
  activeTab: { label: "home", to: AppRoutes.Landing },
};

const reducer = (
  state: NavigationState = initialState,
  action: StateAction
) => {
  switch (action.type) {
    case NavigationStateActions.SetActiveTab:
      return { ...state, activeTab: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
