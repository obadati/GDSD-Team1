import { httpGET } from "../utility/http";

export enum PropertiesEndpoints {
  GetAll = "/api/properties/",
  SearchProperties = "/api/properties/search",
  SearchByCategory = "/api/properties/category",
  GetAgentProperties = "/api/properties/agentProperty/:page?agentId=:agentId",
}
export const BASE_URL = "http://18.185.96.197:5000";

export const getAllProperties = (page: number = 1) => {
  return httpGET(`${BASE_URL}${PropertiesEndpoints.GetAll}${page}`);
};

export const getAgentProperties = (agentId: string, page: number = 1) => {
  return httpGET(
    `${BASE_URL}${PropertiesEndpoints.GetAgentProperties.replace(
      ":page",
      JSON.stringify(page)
    ).replace(":agentId", agentId)}`
  );
};

export const searchForProperties = (query: string, page = 1) => {
  return httpGET(
    `${BASE_URL}${PropertiesEndpoints.SearchProperties}/?text=${query}&page=${page}`
  );
};

export const searchByCategory = (categoryId: number, page = 1) => {
  return httpGET(
    `${BASE_URL}${PropertiesEndpoints.SearchByCategory}/${page}/?categoryId=${categoryId}`
  );
};
