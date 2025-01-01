"use client";

import { UserData } from "@/lib/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Helper function to create default user data
const createDefaultUserData = (): UserData => ({
  tasks: [],
  lists: [],
  tags: [],
});

interface UserContextType {
  userData: UserData | null;
  setUserData: (user: UserData | null) => void;
  updateUserData: (userData: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData((prevUserData) => {
      if (!prevUserData) {
        // Initialize with default values and the new data
        return { ...createDefaultUserData(), ...newData };
      }
  
      // Merge existing state with new data, ensuring no fields are overwritten by undefined
      return {
        ...prevUserData,
        ...newData,
        tasks: newData.tasks ?? prevUserData.tasks,
        lists: newData.lists ?? prevUserData.lists,
        tags: newData.tags ?? prevUserData.tags,
      };
    });
  };
  

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUserData }}>
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
