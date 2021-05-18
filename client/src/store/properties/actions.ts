import { StateAction } from "..";
import { Property } from "./types";

export enum PropertiesStateActions {
  SetAll = "set-all",
}

export const setAllProperties = (properties: Property[] = []): StateAction => ({
  type: PropertiesStateActions.SetAll,
  payload: [...properties],
});
