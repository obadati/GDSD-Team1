import { Property } from "../store/properties/types";
import { httpGET, httpPOST } from "../utility/http";

export enum PropertiesEndpoints {
    GetAll = "/api/properties/",
    SearchProperties = "/api/properties/search",
    SearchByCategory = "/api/properties/category",
    GetAgentProperties = "/api/properties/agentProperty/:page?agentId=:agentId",
    UpdateProperty = "/api/properties/agentProperty/:uid?agentId=:agentUid ",
}

export const BASE_URL = "http://18.185.96.197:5000";

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

export const updateProperty = (property: Property, agentId: string) => {
    const {
        title,
        description,
        price,
        location,
        room,
        size,
        category: { id: categoryId },
        images,
    } = property;
    /**
     * title
        description
        price
        location
        city
        room
        size
        categoryId (int)
        property (single image)
        agentId (from token)
        date (currentDate)
     */
    return httpPOST(
        `${BASE_URL}${PropertiesEndpoints.UpdateProperty.replace(
            ":uid",
            property.id
        )}`,
        {
            title,
            description,
            price,
            location,
            room,
            size,
            categoryId,
            property: images,
            agentId,
            date: new Date(),
        }
    );
};
