import { AuthResponse, UserModel } from "../interfaces/auth-response";

export class User implements AuthResponse {
  user!: UserModel;
  token!: string;
}
