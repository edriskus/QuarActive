export interface Auth {
  token: string;
  user: User;
}

export enum UserType {
  basic = "basic"
}

export interface User {
  id: string;
  email: string;
  type: UserType;
  displayName: string;
  balance?: number;
}

export interface AuthBundle {
  auth?: Auth;
  setAuth(auth: Auth): void;
  clearAuth(): void;
}