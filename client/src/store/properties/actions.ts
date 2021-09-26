import { StateAction } from "..";
import { Property } from "./types";

export enum PropertiesStateActions {
  SetAll = "set-all-properties",
  SetAgentProperties = "set-agent-properties",
  AppendToProperties = "append-to-properties",
}

export const setAllProperties = (properties: Property[] = []): StateAction => ({
  type: PropertiesStateActions.SetAll,
  payload: [...properties],
});

export const appendToProperties = (
  properties: Property[] = []
): StateAction => ({
  type: PropertiesStateActions.AppendToProperties,
  payload: [...properties],
});

export const setAgentProperties = (
  properties: Property[] = []
): StateAction => ({
  type: PropertiesStateActions.SetAgentProperties,
  payload: [...properties],
});
