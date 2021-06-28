export interface CompaniesState {
    companies: Company[];
}

export interface Company {
    id: string;
    logo: string;
    createdAt: Date;
    name: string;
    registrationNumber: string;
}
