export interface AuthResponse {
  user: UserModel;
  token: string;
}

export interface UserModel {
  name: string;
  email: string;
  password:string;
  updated_at: string;
  created_at: string;
  id: number;
}
