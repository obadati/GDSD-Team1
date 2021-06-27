import axios from "axios";
import { httpGET } from "../utility/http";
export enum ApporvalEndpoints {
    ListOfAgents = "/api/admin/allAgent",
    ApproveAgent = "/api/admin/approveStatus/",
    DeleteUser ="/api/user/",
    ListOfProperty ="/api/properties/getAllPropertyByAdmin",
    ApprovePropery = "/api/properties/approveProperty/status/",
    DeleteProperty ="/api/properties/",
    PropertyImage ="/api/properties/property/Image/",
    DeletePropertyImage ="/api/properties/property/delete/image/"
  

}
export const BASE_URL = "http://18.185.96.197:5000";

export const listOfAgent = (page = 1) => {
    return      httpGET(`${BASE_URL}${ApporvalEndpoints.ListOfAgents}/${page}`);
};

export const approveAgent = (id: Number, status:string) => {
    return axios.patch(`${BASE_URL}${ApporvalEndpoints.ApproveAgent}${id}/?status=${status}`);
};

export const deleteAgent = (id: Number) => {
    return axios.delete(`${BASE_URL}${ApporvalEndpoints.DeleteUser}${id}`);
};

export const listOfProperty = (page = 1) => {
    return      httpGET(`${BASE_URL}${ApporvalEndpoints.ListOfProperty}/${page}`);
};

export const approveProperty = (id:Number,status: any) => {
    return axios.patch(`${BASE_URL}${ApporvalEndpoints.ApprovePropery}${id}/?status=${status}`);
};
export const propertyImages = (id: Number) => {
    return httpGET(`${BASE_URL}${ApporvalEndpoints.PropertyImage}?id=${id}`);
};

export const deleteProperty = (id: Number) => {
    return axios.delete(`${BASE_URL}${ApporvalEndpoints.DeleteProperty}${id}`);
};

export const deletePropertyImages = (id: Number) => {
    return axios.delete(`${BASE_URL}${ApporvalEndpoints.DeletePropertyImage}?id=${id}`);
};

 