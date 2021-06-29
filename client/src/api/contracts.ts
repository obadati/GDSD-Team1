import { BASE_URL } from "../constants/constants";
import { httpGET, httpPatch } from "../utility/http";

enum ContractsEndpoints {
  GetAllBuyerContracts = "/api/contract/buyer/:page/?buyerId=:uid",
  GetAllAgentContracts = "/api/contract/agent/?agentId=:uid&page=:page",
  UpdateContractStatus = "/api/contracts/:uid?status=:status",
}

enum ContractStatus {
  Accept = "accept",
  End = "end",
}

export interface Contract {
  buyerId: number;
  agentId: number;
  description: string;
  dateCreate: string;
  dateValid: string;
  propertyDetail: { id: number; images: string };
  title: string;
  status: string;
  approve: string;
}

export const getBuyerContracts = (uid: string, page = 1): Promise<any> => {
  return httpGET(
    `${BASE_URL}${ContractsEndpoints.GetAllBuyerContracts.replace(
      ":page",
      page.toString()
    ).replace(":uid", uid)}`
  );
};

export const getAgentContracts = (uid: string, page = 1): Promise<any> => {
  return httpGET(
    `${BASE_URL}${ContractsEndpoints.GetAllAgentContracts.replace(
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
