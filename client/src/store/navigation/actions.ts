import { StateAction } from "..";
import { NavigationStateActions, NavigationTab } from "./types";

export const setActiveTab = (tab: NavigationTab): StateAction => ({
  type: NavigationStateActions.SetActiveTab,
  payload: tab,
});
