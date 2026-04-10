export type LoginResponse = {
    message: string;
    user: {
        name: string;
        email: string;
        role: string;
    };
    token: string;
};

export type changePassword = {
    currentPassword: string;
    password: string;
    rePassword: string;
};