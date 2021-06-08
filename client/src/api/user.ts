import { httpPOST } from "../utility/http";

export const loginUser = (username: string, password: string) => {
  return httpPOST("http://18.185.96.197:5000/api/admin/login", {
    username,
    password,
  });
};
