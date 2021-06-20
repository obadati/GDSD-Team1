import axios from "axios";
import { httpGET } from "../utility/http";
export enum ApporvalEndpoints {
    ListOfAgents = "/api/admin/allAgent",
    ApproveAgent = "/api/contactUs/",
    ListOfProperty ="/api/properties/getAllPropertyByAdmin",
    ApprovePropery = "/api/propertyDetail",
    DeleteProperty ="/api/properties/",
    DeleteUser ="/api/user/"

}
export const BASE_URL = "http://18.185.96.197:5000";

export const listOfAgent = (page = 1) => {
    return      httpGET(`${BASE_URL}${ApporvalEndpoints.ListOfAgents}/${page}`);
};

export const approveAgent = (status: any) => {
    return axios.patch(`${BASE_URL}${ApporvalEndpoints.ApproveAgent}`, status);
};

export const deleteAgent = (id: Number) => {
    return axios.delete(`${BASE_URL}${ApporvalEndpoints.DeleteUser}${id}`);
};

export const listOfProperty = (page = 1) => {
    return      httpGET(`${BASE_URL}${ApporvalEndpoints.ListOfProperty}/${page}`);
};

export const approvePropery = (status: any) => {
    return axios.patch(`${BASE_URL}${ApporvalEndpoints.ApprovePropery}`, status);
};

export const deleteProperty = (id: Number) => {
    return axios.delete(`${BASE_URL}${ApporvalEndpoints.DeleteProperty}${id}`);
};

 