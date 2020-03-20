export interface Auth {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  balance?: number;
}

export interface AuthBundle {
  auth?: Auth;
  setAuth(auth: Auth): void;
  clearAuth(): void;
}
