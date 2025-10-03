import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./components/ProjectCard";
import Navbar from "./components/Navbar";
import LandingHero from "./components/LandingHero";
import AboutSection from "./components/AboutSection";
import ThemeProvider from "./ThemeProvider";
import { useTheme } from "./theme-store";
import { hexToRgba, getContrastText } from "./utils/color";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 },
};

const PageTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={{ type: "tween", duration: 0.4 }}
    className="min-h-[calc(100vh-64px)] p-8 max-w-6xl mx-auto"
  >
    {children}
  </motion.div>
);

const LandingPage: React.FC = () => (
  <PageTransitionWrapper>
    <LandingHero textColor={"var(--text-color)"} />
  </PageTransitionWrapper>
);

const AboutPage: React.FC = () => (
  <PageTransitionWrapper>
    <AboutSection />
  </PageTransitionWrapper>
);

const ProjectsPage: React.FC = () => {
  const { currentTheme } = useTheme();

  const projects = [
    {
      id: 1,
      title: "React Gadgets",
      description:
        "A collection of components I wrote to practice developing React applications using Vite, Typescript and TailwindCSS.",
      url: "https://react-gadgets.netlify.app",
      github: "https://github.com/demaiodev/react-gadgets",
    },
    {
      id: 2,
      title: "Knucklebuck",
      description:
        "A reproduction of a dice mini-game from 'Cult of the Lamb', written in React with Typescript.",
      url: "https://knucklebuck.netlify.app",
      github: "https://github.com/demaiodev/knucklebuck_2",
    },
    {
      id: 3,
      title: "Dorya",
      description:
        "A tool I wrote with Next.js to practice Tekken fundamentals using the Gamepad WebAPI.",
      url: "https://dorya.netlify.app",
      github: "https://github.com/demaiodev/dorya",
    },
    {
      id: 4,
      title: "Cookie Clicker Automation",
      description:
        "A console-based vanilla JavaScript implementation to further automate the classic clicker game 'Cookie Clicker'.",
      url: "https://orteil.dashnet.org/cookieclicker/",
      github: "https://github.com/demaiodev/cookie-clicker-class",
    },
    {
      id: 5,
      title: "Hintify",
      description:
        "Browser extension that grabs data from the NYT hints page, for when you get stuck and don't want to flip between tabs.",
      url: "https://www.nytimes.com/puzzles/spelling-bee",
      github: "https://github.com/demaiodev/nyt-spelling-bee-hints",
    },
    {
      id: 6,
      title: "tinyWatch",
      description:
        "A Node.js application that scrapes cryptocurrency prices and uses a mail service to send alerts for favorable trades.",
      url: "https://app.tinyman.org/swap?asset_in=0&asset_out=31566704",
      github: "https://github.com/demaiodev/tinyWatch",
    },
  ];

  if (!currentTheme) return null;

  return (
    <PageTransitionWrapper>
      <h2 className={`text-4xl font-bold mb-8 ${currentTheme.text}`}>
        Personal Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </PageTransitionWrapper>
  );
};

// --- 5. MAIN APP COMPONENT ---

const App: React.FC = () => {
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const RootApp: React.FC = () => (
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>
);

export default RootApp;
