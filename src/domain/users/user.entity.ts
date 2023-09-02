export interface UserEntity {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

export interface UserResponse {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
}