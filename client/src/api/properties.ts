import { httpGET } from "../utility/http";

export enum PropertiesEndpoints {
  GetAll = "/api/properties",
  SearchProperties = "",
}
const BASE_URL = "http://18.185.96.197:5000";

export const getAllProperties = () => {
  return httpGET(`${BASE_URL}${PropertiesEndpoints.GetAll}`);
};

export const searchForProperties = () => {
  return;
};
