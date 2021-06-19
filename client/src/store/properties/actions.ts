import { StateAction } from "..";
import { Property } from "./types";

export enum PropertiesStateActions {
  SetAll = "set-all",
  SetAgentProperties = "set-agent-properties",
}

export const setAllProperties = (properties: Property[] = []): StateAction => ({
  type: PropertiesStateActions.SetAll,
  payload: [...properties],
});

export const setAgentProperties = (
  properties: Property[] = []
): StateAction => ({
  type: PropertiesStateActions.SetAgentProperties,
  payload: [...properties],
});
