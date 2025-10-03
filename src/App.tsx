import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransitionWrapper from "./components/PageTransitionWrapper";
import Navbar from "./components/Navbar";
import LandingHero from "./components/LandingHero";
import AboutSection from "./components/AboutSection";
import Resume from "./components/Resume";
import Projects from "./components/Projects";
import ThemeProvider from "./ThemeProvider";
import { useTheme } from "./theme-store";
import { hexToRgba, getContrastText } from "./utils/color";

const AnimationWrappedRoutes: React.FC = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();

  if (!currentTheme) return null;

  const accent500 = currentTheme.accent500;
  const accent600 = currentTheme.accent600;
  const accent100 = currentTheme.accent100;
  const contrastText = getContrastText(accent600);

  const rootStyle = {
    "--accent-100": accent100,
    "--accent-500": accent500,
    "--accent-600": accent600,
    "--accent-700": currentTheme.accent700,
    "--accent-100-rgba": hexToRgba(accent100, 0.18),
    "--accent-contrast-text": contrastText,
    "--text-color": currentTheme.textColor,
    "--nav-bg": currentTheme.navBgColor || undefined,
  } as React.CSSProperties;

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300`}
      style={rootStyle}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {[
            {
              path: "/",
              component: <LandingHero textColor={"var(--text-color)"} />,
            },
            {
              path: "/about",
              component: <AboutSection />,
            },
            {
              path: "/projects",
              component: <Projects textColor={"var(--text-color)"} />,
            },
            {
              path: "/resume",
              component: <Resume />,
            },
          ]
            .map(({ path, component }) => {
              return {
                path,
                component: (
                  <PageTransitionWrapper>{component}</PageTransitionWrapper>
                ),
              };
            })
            .map(({ path, component }) => {
              return <Route path={path} element={component} />;
            })}
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const RootApp: React.FC = () => (
  <Router>
    <ThemeProvider>
      <AnimationWrappedRoutes />
    </ThemeProvider>
  </Router>
);

export default RootApp;
