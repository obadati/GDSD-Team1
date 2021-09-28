import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { Category, Property } from "../store/properties/types";
import { httpGET, httpPOST, httpPUT } from "../utility/http";

export enum PropertiesEndpoints {
  GetAll = "/api/properties/",
  SearchProperties = "/api/properties/search",
  SearchByCategory = "/api/properties/category",
  GetAgentProperties = "/api/properties?agentId=:agentId&page=:page",
  UpdateProperty = "/api/properties/:uid",
  GetAllByAdminStatus = "/api/properties/getAllPropertyByAdminStatus",
  CreateProperty = "/api/properties/",
  PropertyImages = "/api/properties/:uid/images",
}

export interface CreatePropertyParams {
  token: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  categoryId: string;
  size: string;
  room: number;
  city: string;
}

export const getAllProperties = (page: number = 1) => {
  return httpGET(`${BASE_URL}${PropertiesEndpoints.GetAll}${page}`);
};

export const getAgentProperties = (agentId: string, page: number = 1) => {
  return httpGET(
    `${BASE_URL}${PropertiesEndpoints.GetAgentProperties.replace(
      ":page",
      JSON.stringify(page)
    ).replace(":agentId", agentId)}`
  );
};

export const searchForProperties = (query: string, page = 1) => {
  return httpGET(
    `${BASE_URL}${PropertiesEndpoints.SearchProperties}?query=${query}&page=${page}`
  );
};

export const searchByCategory = (categoryId: number, page = 1) => {
  return httpGET(
    `${BASE_URL}${PropertiesEndpoints.SearchByCategory}/${page}/?categoryId=${categoryId}`
  );
};

export const updateProperty = (property: Property, token: string) => {
  const {
    title,
    description,
    price,
    location,
    room,
    size,
    category: { id: categoryId },
    images: image,
    city,
  } = property;
  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price.toString());
  formData.append("location", location);
  formData.append("room", room.toString());
  formData.append("size", size);
  formData.append("categoryId", categoryId);
  formData.append("city", city);
  formData.append("image", image);
  return axios.put(
    `${BASE_URL}${PropertiesEndpoints.UpdateProperty.replace(
      ":uid",
      property.id
    )}`,
    formData,
    {
      headers: {
        "Content-Type": "application/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllPropertyByAdminStatus = (status: string, page = 1) => {
  return httpGET(
    `${BASE_URL}${PropertiesEndpoints.GetAllByAdminStatus}/${page}/?status=${status}`
  );
};

export const createProperty = (params: CreatePropertyParams) => {
  const { token } = params;
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (key !== "token") {
      formData.append(key, (params as any)[key]);
    }
  });
  return httpPOST(
    `${BASE_URL}${PropertiesEndpoints.CreateProperty}`,
    formData,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};
export const addPropertyImages = (
  images: any[],
  property: Property,
  token: string
) => {
  images.forEach((img) => {
    const prop = { ...property, images: img };
    updateProperty(prop, token);
  });
};
