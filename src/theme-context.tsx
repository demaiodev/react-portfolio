import React, { useState, createContext, useContext } from "react";
import type { ThemeId } from "./themes";
import { themes } from "./themes";

interface ThemeContextType {
  themeId: ThemeId;
  currentTheme: (typeof themes)[ThemeId];
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    return (localStorage.getItem("themeId") as ThemeId) || "ocean";
  });

  const currentTheme = themes[themeId] || themes.ocean;

  const handleSetThemeId = (id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem("themeId", id);
  };

  return (
    <ThemeContext.Provider
      value={{ themeId, currentTheme, setThemeId: handleSetThemeId }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
