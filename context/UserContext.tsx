"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Task {
  uid: string;
  taskName: string;
  taskDescription?: string;
  list: string;
  dueDate: Date;
  tags?: string[];
  subTasks?: { sTask: string; sStatus: boolean }[];
  status: boolean;
  createdAt: Date;
}

interface UserData {
  tasks: Task[];
  lists: string[];
  tags: string[];
}

interface UserContextType {
  userData: UserData | null; // Renamed to match your implementation
  setUserData: (user: UserData | null) => void;
  updateUserData: (userData: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // Update user data with partial fields, ensuring the fields are non-undefined
  const updateUserData = (userData: Partial<UserData>) => {
    setUserData((prevUserData) => {
      if (!prevUserData) {
        // If there's no existing user, set the user as the updated one
        return { tasks: [], lists: [], tags: [], ...userData };
      }

      // Return the updated user with fallback values to prevent undefined fields
      return {
        ...prevUserData,
        ...userData,
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
