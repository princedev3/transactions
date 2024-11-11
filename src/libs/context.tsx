"use client";
// import { User } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";
type users = {
  currentUser: User | null;
  setCurrentUser: (item: User) => void;
  updatedUser: (item: User) => void;
};
type User = {
  name: string | null;
  id: number;
  email: string;
  password: string;
  imageUrl: string | null;
  token: string;
  active: boolean;
  createdAt: Date;
} | null;

export const AuthContext = createContext<users | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  const updatedUser = (item: User) => {
    setCurrentUser(item);
  };
  return (
    <AuthContext.Provider value={{ updatedUser, currentUser, setCurrentUser }}>
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const RemoveNullContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("context is null");
  }
  return context;
};
