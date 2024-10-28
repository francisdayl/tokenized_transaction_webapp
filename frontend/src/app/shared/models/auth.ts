export interface User {
    email: string;
    token: string;
    username: string;
    role: string;
}

export interface UserRegistrationData{
    email: string;
    username: string;
    password: string;
}

export interface UserLoginData{
    username: string;
    password: string;
}

export interface UserTokenData{
    username: string;
    email: string;
    id: number;
    tokens: number;
}

export interface UserTokenResponse{
    result: UserTokenData[];
}

export interface UsedToken{
    token_creation: string;
    token_number: string;
    transaction_url: string;
}

export interface TokenUserResponse{
    username: string;
    result: UsedToken[];
}