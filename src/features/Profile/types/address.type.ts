export interface AddressData {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}

export interface AddressFormData {
    name: string;
    details: string;
    phone: string;
    city: string;
}

export interface AddAddressResponse {
    status: string; 
    message: string;
    data: AddressData[];
}

export interface GetAddressesResponse {
    results: number;
    status: "success" | "error";
    data: AddressData[];
}

export interface getAddressDetailsResponse {
    status: string;
    data: AddressData;
}