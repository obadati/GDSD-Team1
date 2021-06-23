import { httpGET } from "../utility/http";
import axios from "axios";
export enum ContactEndpoints {
  CraeteContact = "/api/contactUs/",
  Queries ="/api/contactUs/"
}
export const BASE_URL = "http://18.185.96.197:5000";

export const craeteContact = (user: any) => {
  return axios.post(`${BASE_URL}${ContactEndpoints.CraeteContact}`, user)
};

export const UserQueries = (page = 1) => {
  return httpGET(`${BASE_URL}${ContactEndpoints.Queries}/${page}`);
};