export interface ResetPassword {
    id: number;
    oldPassword: string;
    newPassword: string;
}

export interface UserModelRequest {
    firstName: string;
    lastName: string;
    email: string;
    id: number
}
