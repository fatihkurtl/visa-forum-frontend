export interface IRegisterData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface IRegisterSuccessResponse {
  message: string;
  status: number;
  suggestions: string[];
}

export interface IRegisterErrorResponse {
  [key: string]: string[];
}

export interface ILoginData {
  identifier: string;
  password: string;
}
export interface ILoginErrorResponse {
  non_field_errors: string[];
}

export interface IToken {
  token: string;
  expires_at: string;
}

export interface IRoles {
  role: string;
}

export interface IMember {
  id: number;
  roles: IRoles;
  tokens: IToken[];
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  profile_image: string | null;
  password: string;
  terms: boolean;
  ip_address: string | null;
  email_verified: boolean;
  is_active: boolean;
  country_of_interest: string;
  bio: string | null;
  email_notifications: boolean;
  expertise: string | null;
  created_at: string;
  updated_at: string;
}

export interface IMemberResponse {
  member: IMember;
  token: string;
  expires_at: string;
}
