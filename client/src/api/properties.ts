import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { Property } from "../store/properties/types";
import { httpGET, httpPOST, httpPUT } from "../utility/http";

export enum PropertiesEndpoints {
    GetAll = "/api/properties/",
    SearchProperties = "/api/properties/search",
    SearchByCategory = "/api/properties/category",
    GetAgentProperties = "/api/properties/agentProperty/:page?agentId=:agentId",
    UpdateProperty = "/api/properties/:uid",
    GetAllByAdminStatus = "/api/properties/getAllPropertyByAdminStatus",
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
        `${BASE_URL}${PropertiesEndpoints.SearchProperties}/?text=${query}&page=${page}`
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
