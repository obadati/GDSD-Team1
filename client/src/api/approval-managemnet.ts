import axios from "axios";
import { httpGET } from "../utility/http";
export enum ApporvalEndpoints {
    ListOfAgents = "/api/admin/allAgent",
    ApproveAgent = "/api/contactUs/",
    ListOfProperty ="/api/properties/getAllPropertyByAdmin",
    ApprovePropery = "/api/propertyDetail",
    DeleteProperty ="/api/properties/"

}
export const BASE_URL = "http://localhost:5000";

export const listOfAgent = (page = 1) => {
    return      httpGET(`${BASE_URL}${ApporvalEndpoints.ListOfAgents}/${page}`);
};

export const approveAgent = (user: any) => {
    return axios.patch(`${BASE_URL}${ApporvalEndpoints.ApproveAgent}`, user);
};

export const listOfProperty = (page = 1) => {
    return      httpGET(`${BASE_URL}${ApporvalEndpoints.ListOfProperty}/${page}`);
};

export const approvePropery = (user: any) => {
    return axios.patch(`${BASE_URL}${ApporvalEndpoints.ApprovePropery}`, user);
};

export const deleteProperty = (id: Number) => {
    return axios.delete(`${BASE_URL}${ApporvalEndpoints.DeleteProperty}/${id}`);
};

 