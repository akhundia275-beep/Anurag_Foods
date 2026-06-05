"use client";

import { create } from "zustand";

export type LocalUser = {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  createdAt: string;
};

type StoredUser = LocalUser & {
  passwordHash: string;
};

type AuthState = {
  user: LocalUser | null;
  ready: boolean;
  hydrate: () => void;
  login: (email: string, password: string) => Promise<void>;
  loginWithOtp: (email: string) => void;
  register: (input: { name: string; email: string; mobile?: string; password: string }) => Promise<void>;
  logout: () => void;
};

const usersKey = "anurag_foods_users";
const sessionKey = "anurag_foods_session";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const getStoredUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(usersKey);
    return value ? (JSON.parse(value) as StoredUser[]) : [];
  } catch {
    return [];
  }
};

const setStoredUsers = (users: StoredUser[]) => {
  window.localStorage.setItem(usersKey, JSON.stringify(users));
};

const publicUser = ({ passwordHash, ...user }: StoredUser): LocalUser => user;

const hashPassword = async (password: string) => {
  const encoded = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  ready: false,
  hydrate: () => {
    const sessionId = typeof window !== "undefined" ? window.localStorage.getItem(sessionKey) : null;
    const user = sessionId ? getStoredUsers().find((item) => item.id === sessionId) : null;
    set({ user: user ? publicUser(user) : null, ready: true });
  },
  login: async (email, password) => {
    const cleanEmail = normalizeEmail(email);
    const users = getStoredUsers();
    const user = users.find((item) => item.email === cleanEmail);

    if (!user) {
      throw new Error("No account found with this email.");
    }

    if (user.passwordHash !== (await hashPassword(password))) {
      throw new Error("Incorrect password.");
    }

    window.localStorage.setItem(sessionKey, user.id);
    set({ user: publicUser(user), ready: true });
  },
  loginWithOtp: (email) => {
    const cleanEmail = normalizeEmail(email);

    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      throw new Error("Please enter a valid email.");
    }

    const users = getStoredUsers();
    const existing = users.find((item) => item.email === cleanEmail);
    const user =
      existing ??
      ({
        id: `af-user-${Date.now()}`,
        name: cleanEmail
          .split("@")[0]
          .split(/[._-]+/)
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ") || "Anurag Customer",
        email: cleanEmail,
        passwordHash: "otp-only",
        createdAt: new Date().toISOString()
      } satisfies StoredUser);

    if (!existing) {
      setStoredUsers([...users, user]);
    }

    window.localStorage.setItem(sessionKey, user.id);
    set({ user: publicUser(user), ready: true });
  },
  register: async ({ name, email, mobile, password }) => {
    const cleanName = name.trim();
    const cleanEmail = normalizeEmail(email);
    const cleanMobile = mobile?.trim();

    if (cleanName.length < 2) {
      throw new Error("Please enter your full name.");
    }

    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      throw new Error("Please enter a valid email.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const users = getStoredUsers();
    if (users.some((item) => item.email === cleanEmail)) {
      throw new Error("This email is already registered.");
    }

    const user: StoredUser = {
      id: `af-user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      mobile: cleanMobile,
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString()
    };

    setStoredUsers([...users, user]);
    window.localStorage.setItem(sessionKey, user.id);
    set({ user: publicUser(user), ready: true });
  },
  logout: () => {
    window.localStorage.removeItem(sessionKey);
    set({ user: null, ready: true });
  }
}));
