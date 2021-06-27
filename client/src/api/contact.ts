import axios from "axios";
import { BASE_URL } from "../constants/constants";
export enum ContactEndpoints {
    CraeteContact = "/api/contactUs/",
}

export const craeteContact = (user: any) => {
    return axios.post(`${BASE_URL}${ContactEndpoints.CraeteContact}`, user);
};
