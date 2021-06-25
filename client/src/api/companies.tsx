import axios from "axios";
import { httpGET } from "../utility/http";
export enum CompanyEndpoints {
    GetCompanies = "/api/company/",
    DeleteCompanies = "/api/company/",
    AddCompanies ="/api/company/",
    ListOfAgents ="/api/company/agentList/",
    ListOfProperty ="/api/properties/agentProperty/",
    PropertyImage ="/api/properties/property/Image/",
    
}
export const BASE_URL = "http://18.185.96.197:5000";
//export const BASE_URL = "http://localhost:5000";

export const propertyImages = (id: Number) => {
    return httpGET(`${BASE_URL}${CompanyEndpoints.PropertyImage}?id=${id}`);
};
export const listOfCompanies = (page:Number) => {
    return  httpGET(`${BASE_URL}${CompanyEndpoints.GetCompanies}${page}`);
};
export const companyAgent = (page:Number,companyId:Number) => {
    return  httpGET(`${BASE_URL}${CompanyEndpoints.ListOfAgents}${page}/?companyId=${companyId}`);
};

export const listOfPropertyByAgent = (page:Number,agentId:Number) => {
    return  httpGET(`${BASE_URL}${CompanyEndpoints.ListOfProperty}${page}/?agentId=${agentId}`);
};
export const postCompanies = (companies: any) => {
    return axios.post(`${BASE_URL}${CompanyEndpoints.AddCompanies}`,companies);
};

export const deleteCompanes = (id: Number) => {
    return axios.delete(`${BASE_URL}${CompanyEndpoints.DeleteCompanies}${id}`);
};

 