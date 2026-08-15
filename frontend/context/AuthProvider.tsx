"use client";
import { UserPayload } from "@/types/auth";
import { createContext, useContext } from "react";
interface AuthContextProvider {
  user: UserPayload;
}
const AuthContext = createContext<AuthContextProvider | null>(null);

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserPayload;
}) => {
  return (
    <AuthContext.Provider value={{ user: initialUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
