import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { httpGET } from "../utility/http";
export enum ApprovalEndpoints {
  ListOfAgents = "/api/admin/allAgent",
  ApproveAgent = "/api/admin/approveStatus/",
  DeleteUser = "/api/user/",
  ListOfProperty = "/api/properties/getAllPropertyByAdmin",
  ApprovePropery = "/api/properties/approveProperty/status/",
  DeleteProperty = "/api/properties/",
  PropertyImage = "/api/properties/property/Image/",
  DeletePropertyImage = "/api/properties/property/delete/image/",
}

export const listOfAgent = (page = 1) => {
  return httpGET(`${BASE_URL}${ApprovalEndpoints.ListOfAgents}/${page}`);
};

export const approveAgent = (id: Number, status: string) => {
  return axios.patch(
    `${BASE_URL}${ApprovalEndpoints.ApproveAgent}${id}/?status=${status}`
  );
};

export const deleteAgent = (id: Number) => {
  return axios.delete(`${BASE_URL}${ApprovalEndpoints.DeleteUser}${id}`);
};

export const listOfProperty = (page = 1) => {
  return httpGET(`${BASE_URL}${ApprovalEndpoints.ListOfProperty}/${page}`);
};

export const approveProperty = (id: Number, status: any) => {
  return axios.patch(
    `${BASE_URL}${ApprovalEndpoints.ApprovePropery}${id}/?status=${status}`
  );
};
export const propertyImages = (id: Number) => {
  return httpGET(`${BASE_URL}${ApprovalEndpoints.PropertyImage}?id=${id}`);
};

export const deleteProperty = (id: Number) => {
  return axios.delete(`${BASE_URL}${ApprovalEndpoints.DeleteProperty}${id}`);
};

export const deletePropertyImages = (id: Number) => {
  return axios.delete(
    `${BASE_URL}${ApprovalEndpoints.DeletePropertyImage}?id=${id}`
  );
};
