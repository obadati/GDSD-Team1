export interface PropertiesState {
    properties: Property[];
    agentProperties: Property[];
}

export interface Category {
    id: string;
    name: string;
}

export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string;
    category: Category;
    size: string;
    room: number;
    city: string;
    imageProperties: string[];
    agentId: string;
}

export interface User {
    firstName: string;
    lastName: string;
    companyName: string;
    rating: number;
    image: string;
}
