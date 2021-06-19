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
}
