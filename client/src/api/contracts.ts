import { BASE_URL } from "../constants/constants";
import { httpGET, httpPatch } from "../utility/http";

enum ContractsEndpoints {
    GetAllBuyerContracts = "/api/contracts?userId=:uid&page=:page",
    UpdateContractStatus = "/api/contracts/:uid?status=:status",
}

enum ContractStatus {
    Accept = "accept",
    End = "end",
}

export const getBuyerContracts = (uid: string, page = 1) => {
    return httpGET(
        `${BASE_URL}${ContractsEndpoints.GetAllBuyerContracts.replace(
            ":page",
            page.toString()
        ).replace(":uid", uid)}`
    );
};

export const updateContractStatus = (uid: string, status: ContractStatus) => {
    httpPatch(
        `${BASE_URL}${ContractsEndpoints.UpdateContractStatus.replace(
            ":uid",
            uid
        ).replace(":status", status)}`
    );
};
