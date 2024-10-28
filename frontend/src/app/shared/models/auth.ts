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