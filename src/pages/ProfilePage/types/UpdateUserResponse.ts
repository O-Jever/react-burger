export type UpdateUserResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
};