import { createContext, ReactNode, useContext, useState } from "react";

interface SuperFocusContextType {
  activeState: string;
  setActiveState: (state: string) => void;
  getColor: () => string;
}

interface SuperFocusProviderProps {
  children: ReactNode;
}

const SuperFocusContext = createContext<SuperFocusContextType | null>(null);

export const SuperFocusProvider = ({ children }: SuperFocusProviderProps) => {
  const [activeState, setActiveState] = useState<string>("study");

  const getColor = (): string => {
    switch (activeState) {
      case "shortBreak":
        return "blue";
      case "longBreak":
        return "purple";
      default:
        return "emerald";
    }
  };

  return (
    <SuperFocusContext.Provider
      value={{ activeState, setActiveState, getColor }}
    >
      {children}
    </SuperFocusContext.Provider>
  );
};

export const useSuperFocus = (): SuperFocusContextType => {
  const context = useContext(SuperFocusContext);
  if (!context) {
    throw new Error("useSuperFocus must be used within a PomodoroProvider");
  }
  return context;
};
