import axios from "axios";
import { httpGET } from "../utility/http";
export enum CompanyEndpoints {
    GetCompanies = "/api/company/",
    DeleteCompanies = "/api/company/",
    AddCompanies ="/api/company//"
}
export const BASE_URL = "http://18.185.96.197:5000";

export const listOfCompanies = (page:Number) => {
    return  httpGET(`${BASE_URL}${CompanyEndpoints.GetCompanies}${page}`);
};
export const postCompanes = (companies: any) => {
    return axios.post(`${BASE_URL}${CompanyEndpoints.AddCompanies}`,companies);
};

export const deleteCompanes = (id: Number) => {
    return axios.delete(`${BASE_URL}${CompanyEndpoints.DeleteCompanies}${id}`);
};

 