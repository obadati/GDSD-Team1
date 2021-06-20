import axios from "axios";
import { httpGET } from "../utility/http";
export enum ApporvalEndpoints {
    ListOfAgents = "/api/admin/allAgent",
    ApproveAgent = "/api/contactUs/",
    ApprovePropery = "/api/propertyDetail",
}
export const BASE_URL = "http://18.185.96.197:5000";

export const listOfAgent = (page = 1) => {
    return      httpGET(`${BASE_URL}${ApporvalEndpoints.ListOfAgents}/${page}`);
};

export const approveAgent = (user: any) => {
    return axios.patch(`${BASE_URL}${ApporvalEndpoints.ApproveAgent}`, user);
};

export const approvePropery = (user: any) => {
    return axios.patch(`${BASE_URL}${ApporvalEndpoints.ApprovePropery}`, user);
};
