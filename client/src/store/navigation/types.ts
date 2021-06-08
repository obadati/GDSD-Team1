import { AppRoutes } from "../../containers/Router/routes";

export interface NavigationState {
  activeTab: NavigationTab;
}

export interface NavigationTab {
  label: string;
  to: AppRoutes;
}

export interface UserActions {
  label: string;
  to?: AppRoutes;
}

export enum NavigationStateActions {
  SetActiveTab = "set-active-tab",
}
