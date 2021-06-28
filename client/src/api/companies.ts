import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { httpGET } from "../utility/http";

export enum CompaniesEndpoints {
    getAllCompanies = "/api/company/:page",
    GetCompanies = "/api/company/",
    DeleteCompanies = "/api/company/",
    AddCompanies = "/api/company/",
    ListOfAgents = "/api/company/agentList/",
    ListOfProperty = "/api/properties/user/approve/agent/property/",
    PropertyImage = "/api/properties/property/Image/",
}

export const getAllCompanies = (page = 1) => {
    return httpGET(
        `${BASE_URL}${CompaniesEndpoints.getAllCompanies.replace(
            ":page",
            page.toString()
        )}`
    );
};

export const propertyImages = (id: Number) => {
    return httpGET(`${BASE_URL}${CompaniesEndpoints.PropertyImage}?id=${id}`);
};

export const listOfCompanies = (page: Number) => {
    return httpGET(`${BASE_URL}${CompaniesEndpoints.GetCompanies}${page}`);
};

export const companyAgent = (page: Number, companyId: Number) => {
    return httpGET(
        `${BASE_URL}${CompaniesEndpoints.ListOfAgents}${page}/?companyId=${companyId}`
    );
};

export const listOfPropertyByAgent = (page: Number, agentId: Number) => {
    return httpGET(
        `${BASE_URL}${CompaniesEndpoints.ListOfProperty}${page}/?agentId=${agentId}`
    );
};

export const postCompanies = (companies: any) => {
    return axios.post(
        `${BASE_URL}${CompaniesEndpoints.AddCompanies}`,
        companies
    );
};

export const deleteCompanes = (id: Number) => {
    return axios.delete(
        `${BASE_URL}${CompaniesEndpoints.DeleteCompanies}${id}`
    );
};
