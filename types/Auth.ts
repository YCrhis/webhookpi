export interface UserRegisterI{
    name: string;
    email: string;
    password: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface LoginI {
    email: string;
    password: string;
}
