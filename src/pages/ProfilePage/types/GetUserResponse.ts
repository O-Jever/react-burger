export type GetUserResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
};