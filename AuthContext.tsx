"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type UserRole = "customer" | "manager";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    role: UserRole
  ) => { success: boolean; message: string };
  signup: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => { success: boolean; message: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "airbnb_clone_users";
const CURRENT_USER_KEY = "airbnb_clone_current_user";

function getStoredUsers(): User[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(USERS_KEY);

    if (stored) {
      return JSON.parse(stored);
    }

    const demoUsers: User[] = [
      {
        id: "demo-customer",
        name: "Demo Customer",
        email: "customer@demo.com",
        password: "customer123",
        role: "customer",
      },
      {
        id: "demo-manager",
        name: "Demo Manager",
        email: "manager@demo.com",
        password: "manager123",
        role: "manager",
      },
    ];

    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));

    return demoUsers;
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }

    getStoredUsers();
    setLoading(false);
  }, []);

  const signup = (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    const users = getStoredUsers();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return {
        success: false,
        message: "Please enter your name.",
      };
    }

    if (!cleanEmail) {
      return {
        success: false,
        message: "Please enter your email.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters.",
      };
    }

    const existingUser = users.find(
      (existing) => existing.email === cleanEmail
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: cleanName,
      email: cleanEmail,
      password,
      role,
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    setUser(newUser);

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const login = (
    email: string,
    password: string,
    role: UserRole
  ) => {
    const users = getStoredUsers();

    const foundUser = users.find(
      (existing) =>
        existing.email === email.trim().toLowerCase() &&
        existing.password === password &&
        existing.role === role
    );

    if (!foundUser) {
      return {
        success: false,
        message:
          "Invalid email, password, or account type.",
      };
    }

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(foundUser)
    );

    setUser(foundUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}