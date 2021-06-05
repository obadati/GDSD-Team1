import { httpPOST } from "../utility/http";

export enum ContactEndpoints {
  CraeteContact = "/api/contactUs/",
}
export const BASE_URL = "http://18.185.96.197:5000";

export const craeteContact = (user: any) => {
  const params = new URLSearchParams();
  for (const key in user) {
    params.append(key, user[key]);
  }
  return httpPOST(`${BASE_URL}${ContactEndpoints.CraeteContact}`, params);
};
