export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserPayload {
  id?: string;
  email: string;
  name: string;
  // is_verified: boolean;
}
