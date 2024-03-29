// Review: File extension should be .ts and merge with api/companies.ts
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { httpGET } from "../utility/http";
export enum CompanyEndpoints {
  GetCompanies = "/api/company/",
  DeleteCompanies = "/api/company/",
  AddCompanies = "/api/company/",
  ListOfAgents = "/api/company/agentList/",
  ListOfProperty = "/api/properties/user/approve/agent/property/",
  PropertyImage = "/api/properties/property/Image/",
}

export const propertyImages = (id: Number) => {
  return httpGET(`${BASE_URL}${CompanyEndpoints.PropertyImage}?id=${id}`);
};
export const listOfCompanies = (page: Number) => {
  return httpGET(`${BASE_URL}${CompanyEndpoints.GetCompanies}${page}`);
};
export const companyAgent = (page: Number, companyId: Number) => {
  return httpGET(
    `${BASE_URL}${CompanyEndpoints.ListOfAgents}${page}/?companyId=${companyId}`
  );
};

export const listOfPropertyByAgent = (page: Number, agentId: Number) => {
  return httpGET(
    `${BASE_URL}${CompanyEndpoints.ListOfProperty}${page}/?agentId=${agentId}`
  );
};
export const postCompanies = (companies: any) => {
  return axios.post(`${BASE_URL}${CompanyEndpoints.AddCompanies}`, companies);
};

export const deleteCompanes = (id: Number) => {
  return axios.delete(`${BASE_URL}${CompanyEndpoints.DeleteCompanies}${id}`);
};
