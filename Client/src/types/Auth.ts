import { PersonalityTraitType } from "./Persona";

export interface Auth {
  token: string;
  user: User;
  emulated?: boolean;
}

export enum UserType {
  Teen = "Teen",
  Young = "Young",
  Family = "Family"
}

export interface User {
  id: string;
  email: string;
  type: UserType;
  displayName: string;
  personalityTraits: PersonalityTraitType[];
  balance?: number;
}

export interface AuthBundle {
  auth?: Auth;
  setAuth(auth: Auth): void;
  clearAuth(): void;
}
