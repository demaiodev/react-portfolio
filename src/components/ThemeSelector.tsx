import React, { useState } from "react";
import { Palette } from "lucide-react";
import { useTheme } from "../theme-store";
import { themes } from "../themes";
import type { ThemeId } from "../themes";

const ThemeSelector: React.FC = () => {
  const { themeId, currentTheme, setThemeId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isLightTheme =
    currentTheme.navBg.includes("white") ||
    currentTheme.navBg.includes("gray-100");

  const buttonStyle: React.CSSProperties = isLightTheme
    ? { backgroundColor: undefined, color: "var(--accent-600)" }
    : {
        backgroundColor: "var(--accent-600)",
        color: "var(--accent-contrast-text)",
        boxShadow: `0 0 0 3px var(--accent-100-rgba)`,
      };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none`}
        style={buttonStyle}
        aria-label="Select color theme"
      >
        <Palette className="w-5 h-5" />
      </button>
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden z-20 border transition-colors`}
          style={{
            backgroundColor: "var(--nav-bg)",
            color: "var(--text-color)",
          }}
        >
          <div className="p-3 text-sm font-semibold border-b">Select Theme</div>
          {Object.keys(themes).map((key) => {
            const id = key as ThemeId;
            const theme = themes[id];
            const IndicatorIcon = theme.indicator as React.ComponentType<
              React.SVGProps<SVGSVGElement>
            >;

            return (
              <button
                key={id}
                onClick={() => {
                  setThemeId(id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 transition-colors flex items-center justify-between hover:brightness-95`}
                style={{ color: "var(--text-color)" }}
              >
                <div className="flex items-center space-x-2">
                  <IndicatorIcon
                    className="w-4 h-4"
                    style={{ color: theme.accent600 || theme.accent500 }}
                  />
                  <span>{theme.name}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2`}
                  style={{
                    backgroundColor: theme.accent100,
                    borderColor: themeId === id ? theme.accent500 : "#d1d5db",
                    boxShadow:
                      themeId === id
                        ? `0 0 0 3px ${theme.accent100}80`
                        : undefined,
                  }}
                ></div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
