import { authProvider, gender, zodiacSign } from "$lib/client/enums";
import { create } from "zustand";
export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string | null;
  username: string;
  email: string;
  phoneNumber: string | null;
  gender: typeof gender;
  authProvider: typeof authProvider | null;
  authProviderId: string | null;
  dateOfBirth: Date | null;
  avatar: string;
  collegeId: string | null;
  collegeEmail: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  zodiacSign: typeof zodiacSign | null;
  openToRelationships: boolean | null;
  totalConfessions: number;
  city: string | null;
  bio: string | null;
  anonymous: boolean;
  password: string | null;
  lastSeenAt: Date;
  createdAt: Date;
};
type AuthState = {
  user: User | null;
  session: Session | null;
  setAuth: (user: User, Session: Session) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setAuth: (user, session) => set({ user, session }),
  clearAuth: () => set({ user: null, session: null }),
}));
