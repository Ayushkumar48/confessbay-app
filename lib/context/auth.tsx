import { authProvider, gender, zodiacSign } from "$lib/client/enums";
import { clearCookies } from "$lib/secure/cookie-helper";
import { apiFetch } from "$lib/secure/interceptor";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
export type Session = {
  id: string;
  userId: string;
  expiresAt: string;
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
  dateOfBirth: string | null;
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
  lastSeenAt: string;
  createdAt: string;
};
type AuthContextType = {
  user: User | null;
  session: Session | null;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const logout = useCallback(async () => {
    try {
      await apiFetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: session?.id }),
      });
    } finally {
      await clearCookies();
      setUser(null);
      setSession(null);
    }
  }, [session]);

  const fetchProfile = useCallback(async () => {
    if (session || user) return;

    const res = await apiFetch("/api/me");
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      setSession(data.session);
    } else {
      setUser(null);
      setSession(null);
    }
  }, [session, user]);

  const value = useMemo(
    () => ({ user, session, logout, fetchProfile }),
    [user, session, logout, fetchProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside ClientShell");
  return ctx;
}
