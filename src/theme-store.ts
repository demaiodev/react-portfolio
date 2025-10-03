import { createContext, useContext } from "react";
import type { ThemeId } from "./themes";
import { themes } from "./themes";

interface ThemeContextType {
  themeId: ThemeId;
  currentTheme: (typeof themes)[ThemeId];
  setThemeId: (id: ThemeId) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useTheme;
