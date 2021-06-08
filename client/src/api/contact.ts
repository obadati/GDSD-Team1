import { httpPOST } from "../utility/http";
import axios from "axios";
export enum ContactEndpoints {
  CraeteContact = "/api/contactUs/",
}
export const BASE_URL = "http://18.185.96.197:5000";

export const craeteContact = (user: any) => {
  return axios.post(`${BASE_URL}${ContactEndpoints.CraeteContact}`, user)
};
