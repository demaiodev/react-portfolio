import React, { useState } from "react";
import type { ThemeId } from "./themes";
import { themes } from "./themes";
import { ThemeContext } from "./theme-store";

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
