import { BASE_URL } from "../constants/constants";
import { httpGET, httpPatch, httpPOST } from "../utility/http";

enum ContractsEndpoints {
  GetAllBuyerContracts = "/api/contract/buyer/:page/?buyerId=:uid",
  GetAllAgentContracts = "/api/contract/agent/?agentId=:uid&page=:page",
  UpdateContractStatus = "/api/contract/:uid",
  CreateContractRequest = "/api/contract",
}

export enum ContractStatus {
  Approved = "approved",
  Pending = "pending",
  Rejected = "rejected",
}

export interface Contract {
  buyerId: number;
  agentId: number;
  description: string;
  dateCreate: string;
  dateValid: string;
  propertyDetail: { id: number; images: string };
  title: string;
  status: ContractStatus;
  approve: string;
  id: number;
  seller: string;
  buyer: string;
}

// Review: Promise should have more specific return type
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

// Review: Add return type to function signature
export const updateContract = (
  uid: number,
  status: ContractStatus,
  dateValid: string
) => {
  return httpPatch(
    `${BASE_URL}${ContractsEndpoints.UpdateContractStatus.replace(
      ":uid",
      uid.toString()
    )}`,
    { status, dateValid }
  );
};

export const createContractRequest = (
  propertyId: string,
  agentId: string,
  buyerId: string
) => {
  httpPOST(`${BASE_URL}${ContractsEndpoints.CreateContractRequest}`, {
    propertyId,
    agentId,
    buyerId,
  });
};
