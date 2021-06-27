import { BASE_URL } from "../constants/constants";
import { httpGET } from "../utility/http";

export enum AvgPricePropertiesEndpoints {
    GetAvgPrice = "/api/properties/user/findAvgPrice",
}

export const AvgPrice = (
    query1: string,
    query2: number,
    query3: number,
    query4: number
) => {
    return httpGET(
        `${BASE_URL}${AvgPricePropertiesEndpoints.GetAvgPrice}/?city=${query1}&categoryId=${query2}&room=${query3}&size=${query4}`
    );
};
