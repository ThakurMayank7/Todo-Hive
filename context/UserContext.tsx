"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  updateUser: (userData: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);

  // Update user data with partial fields, ensuring the fields are non-undefined
  const updateUser = (userData: Partial<UserData>) => {
    setUser((prevUser) => {
      if (!prevUser) {
        // If there's no existing user, set the user as the updated one
        return { id: "", name: "", email: "", ...userData };
      }

      // Return the updated user with fallback values to prevent undefined fields
      return {
        ...prevUser,
        ...userData,
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
