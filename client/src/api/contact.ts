import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { httpGET } from "../utility/http";
export enum ContactEndpoints {
  // Review: Fix Spellings
  CreateContact = "/api/contactUs/",
  Queries = "/api/contactUs/",
  DeleteQueries = "/api/contactUs/",
}

export const createContact = (user: any) => {
  return axios.post(`${BASE_URL}${ContactEndpoints.CreateContact}`, user);
};

export const UserQueries = (page = 1) => {
  return httpGET(`${BASE_URL}${ContactEndpoints.Queries}/${page}`);
};

export const DeleteQueries = (id: Number) => {
  return axios.delete(`${BASE_URL}${ContactEndpoints.DeleteQueries}${id}`);
};
