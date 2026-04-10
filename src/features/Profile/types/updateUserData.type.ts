
export type User = {
    name: string;
    email: string;
    role: string;
};
export type UserUpdate = {
    name: string;
    email: string;
    phone: string;
};

export type UserResponse = {
    message: string;
    user: User;
};

export interface UpdateUserResponse {
    message: "success" | "fail";
    errors?: {
        value?: string;
        msg: string;
        param: string;
        location?: string;
    };
}