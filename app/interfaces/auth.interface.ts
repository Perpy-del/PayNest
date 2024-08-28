export type TokenPayload = {
  email: string | undefined;
  id: string | undefined;
};

export type RegisterUserValidationType = {
  username: string;
  otp: number | string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface UserInterface {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: any;
}

export interface UserDataInterface {
  username: string;
  otp: string | number;
  email: string;
  firstName: string;
  lastName: string;
  password: any;
}

export type LoginUserValidationType = {
  email: string;
  password: string;
};

export type DateOptionsType = {
  month: 'long' | 'numeric' | '2-digit' | 'short' | 'narrow' | undefined;
  day: 'numeric' | '2-digit' | undefined;
};

export type PasswordTokenType = {
  passwordToken: string | number;
  expiryTime: Date | string;
};

export interface UserReturnInterface {
  id?: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
